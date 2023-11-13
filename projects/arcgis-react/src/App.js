
import MyMap from './tutorial/MyMap';
import Display_a_map from './tutorial/Display_a_map';
import Change_basemap_layer from './tutorial/Change_basemap_layer';
import Custom_basemap_style from './tutorial/Custom_basemap_style';
import { useState } from 'react';

function App() {
  // const [long, setLong] = useState(-118.805)

  // const handleOnclick = (e) => {
  //   setLong(e.target.value)
  // }

  return (
    <>
      {/* <div
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "100" }}
      >
        <input placeholder="longitute" value={long} onChange={handleOnclick} />
        <input placeholder="longitute" value={long} onClick={handleDestroy} />
      </div> */}
      {/* <Display_a_map
      // long={long}
      /> */}
      {/* <MyMap /> */}
      {/* <Change_basemap_layer /> */}
      <Custom_basemap_style />
    </>
  );
}

export default App;
