import { useRef, useState } from "react"
import "./App.css"
import { Canvas, useFrame } from "@react-three/fiber"
import { TorusKnotGeometry } from "three"


const Cube = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2.0
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
  })

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Sphere = ({ position, size, color }) => {
  const ref = useRef()
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2
  })

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? color : "lightblue"} wireframe />
    </mesh>
  )
}

const Torus = ({ position, size, color }) => {
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const TorusKnot = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2.0
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
  })

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const App = () => {
  return (
    <Canvas>

      <directionalLight position={[0, 0, 2]} intensity={1} />
      {/* <ambientLight intensity={0.4} /> */}

      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
        <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />

        <Cube position={[-1, 2, 0]} color={"blue"} size={[1, 1, 1]} />
        <Cube position={[1, 2, 0]} color={"yellow"} size={[1, 1, 1]} />
      </group> */}

      {/* <Cube position={[0, 0, 0]} size={[1, 1, 1]} color="orange" /> */}
      <Sphere position={[0, 0, 0]} size={[1, 30, 30]} color="orange" />
      {/* <Torus position={[2, 0, 0]} size={[0.8, 0.1, 30, 30]} color="blue" />
      <TorusKnot position={[-2, 0, 0]} size={[0.5, 0.1, 1000, 50]} color="hotpink" /> */}
    </Canvas>
  )
}

export default App
