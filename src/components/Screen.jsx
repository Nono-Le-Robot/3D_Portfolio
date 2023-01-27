import React, { useRef, useEffect, useState } from "react";
import FirstPage from "./FirstPage";
import BtnCompetences from "./BtnCompetences";
import BtnHobbies from "./BtnHobbies";
import BtnInfos from "./BtnInfos";
import BtnProjects from "./BtnProjects";

export default function Screen() {
  // Récupérer la référence de la scène
  const [firstEnd, setFirstEnd] = useState(false);
  const handleFirstEnd = (value) => {
    setFirstEnd(value);
  };

  return (
    <>
      <FirstPage onFirstEnd={handleFirstEnd} />
      <BtnCompetences firstEnd={firstEnd} />
      <BtnHobbies firstEnd={firstEnd} />
      <BtnInfos firstEnd={firstEnd} />
      <BtnProjects firstEnd={firstEnd} />
      {/* <mesh ref={sceneRef} />; */}
    </>
  );
}
