import * as React from "react"
import ReactDOM from "react-dom"
import { Frame, useMotionValue, useTransform, useAnimation } from "framer"
import { PhoneScreen } from "./PhoneScreen"

import "./styles.css"

function Photo(props) {
  return (
    <Frame
      image={props.picture}
      position="relative"
    />
  )
}

function App() {

  const photos = [
    "https://images.unsplash.com/photo-1500042738280-d2cf3121aa44?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1529168912995-348197746b79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1445623168371-714eea2f2833?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1475066392170-59d55d96fe51?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1504731026313-e68ebd5ff02c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1536154010-6ab8a1d741d2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1525945882052-c5c66ba342b3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1542622466-cbbe173c10ca?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ",
    "https://images.unsplash.com/photo-1510926078773-369698bda778?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg1ODY2fQ"
  ]

  let sheetPosition = useMotionValue(0);
  let galleryPosition = useTransform(sheetPosition, [0, -270], [0, -460])
  let switchBg = useTransform(sheetPosition, [0, -270], [0, 0.4])
  let sheetAnimation = useAnimation()



  return (
    <div className="App">

      {/* You can put an image URL as the background too */}
      <PhoneScreen background="url(/map-bg.jpg)">
        <Frame position={"absolute"} size={"100%"} opacity={switchBg} backgroundColor="black" />


        {/* Gallery Container */}
        <Frame
          position={"absolute"}
          y={galleryPosition}
          width="100%"
          bottom={-90}
          borderRadius={5}
          backgroundColor="white"
          style={{
            display: "flex",
            overflow: "scroll",
            pointerEvents: "auto" // this is needed to enable scrolling
          }}
        >
          {/* TODO: Populate with the list of photos above */}\
            {photos.map(photo => (
            <Photo picture={photo} position={"relative"} key={photo} style={{ marginRight: 2 }} />
          ))}
        </Frame>

        {/* Bottom Sheet */}
        <Frame
          drag={"y"}
          y={sheetPosition}
          animate={sheetAnimation}
          dragConstraints={{ left: 0, right: 0, top: -290, bottom: 0 }}
          onDragEnd={function (event, info) {
            sheetAnimation.start({
              y: Math.abs(info.point.y) > 135 ? -270 : 0
            })
          }}
          center="x"
          width="100%"
          height={400}
          bottom={-290}
          borderRadius={5}
          shadow="0 0 5px rgba(0,0,0,0.25)"
          image="/bottom-sheet.jpg"
        />

      </PhoneScreen>

    </div >
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
