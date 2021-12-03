import { useGLTF, Shadow, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
import BillboardHoarding from '../BillboardHoarding'

const PokemonBadges = () => {
  const gltf = useGLTF('./libs/pokemon_masters_cap/scene.gltf')
  const [githubStats, setGithubStats] = useState('')
  const [sketchfabStats, setSketchfabStats] = useState('')

  const model = {
    position: new THREE.Vector3(-16, 0, 10),
    rotation: new THREE.Vector3(0, Math.PI, 0),
    options: {
      focusOnPosition: new THREE.Vector3(-1, 0.8, 1),
      animateToPosition: new THREE.Vector3(0, 2.4, 5),
      fov: 20,
    },
  }

  // Api data handlers...

  const setGithubStatsHandler = (data) => {
    const githubStat = `
    Github@raghav-wd\n
    Works at: ${data.company}
    Repos: ${data.public_repos}
    Followers: ${data.followers}
    Location: ${data.location}
    `
    setGithubStats(githubStat)
  }

  const setSketchfabStatsHandler = (data) => {
    const sketchfabStat = `
    Sketchfab@raghav-wd\n
    Likes: ${data.likes}
    Views: ${data.views}
    Followers: ${data.followers}
    `
    setSketchfabStats(sketchfabStat)
  }

  useEffect(() => {
    // Github api calls...
    fetch('https://api.github.com/users/raghav-wd')
      .then((res) => res.json())
      .then((json) => setGithubStatsHandler(json))

    // Sketchfab api calls...
    let likes = 0
    let views = 0
    let followers = 0
    const sum = (like, view) => {
      likes += like
      views += view
    }

    const dataHandler = (json) => {
      followers = json.followerCount
    }

    // Waits until data from two sketchfab api endpoint returns
    setTimeout(
      () => setSketchfabStatsHandler({ likes, views, followers }),
      2000
    )

    fetch('https://api.sketchfab.com/v3/me', {
      headers: new Headers({
        authorization: 'Token 51d0a31fb5c743548ad94cebe5c7a6cb',
      }),
    })
      .then((res) => res.json())
      .then((json) => dataHandler(json))

    fetch('https://api.sketchfab.com/v3/me/models ', {
      headers: new Headers({
        authorization: 'Token 51d0a31fb5c743548ad94cebe5c7a6cb',
      }),
    })
      .then((res) => res.json())
      .then((json) => json.results.map((i) => sum(i.likeCount, i.viewCount)))
  }, [])

  return (
    <mesh>
      <mesh position={[...model.position]} rotation={[...model.rotation]}>
        <boxBufferGeometry args={[1.6, 0.5, 1.6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive
        position={[model.position.x, 0.3, model.position.z]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={0.0005}
        object={gltf.scene}
        dispose={null}
      />
      <BillboardHoarding
        position={[model.position.x - 5, 0, model.position.z - 3]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
      <Text
        color="#212121"
        position={[model.position.x - 5, 1.5, model.position.z - 3.3]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Stats
      </Text>
      <Text
        color="red"
        position={[model.position.x + 0.2, 1.5, model.position.z + 3.3]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#fff"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        {githubStats}
      </Text>
      <Text
        color="red"
        position={[model.position.x - 3, 0.5, model.position.z]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#fff"
        outlineWidth={0.01}
        rotation={[Math.PI / 6, model.rotation.y, 0]}
      >
        {sketchfabStats}
      </Text>
      <Shadow
        position={[model.position.x, 0.001, model.position.z]}
        rotation-x={-Math.PI / 2}
        scale={3}
        opacity={0.15}
      />
    </mesh>
  )
}

export default PokemonBadges
