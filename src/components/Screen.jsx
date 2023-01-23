import React, { useRef, useEffect, useState } from "react";
import FirstPage from "./FirstPage";
import BtnCompetences from "./BtnCompetences";
import BtnHobbies from "./BtnHobbies";
import BtnInfos from "./BtnInfos";

export default function Screen({ goBack }) {
  // Récupérer la référence de la scène
  const [firstEnd, setFirstEnd] = useState(false);
  const handleFirstEnd = (value) => {
    setFirstEnd(value);
  };
  useEffect(() => {
    console.log("fffinniii");
  }, [firstEnd]);

  return (
    <>
      <FirstPage onFirstEnd={handleFirstEnd} />
      <BtnCompetences goBack={goBack} firstEnd={firstEnd} />
      <BtnHobbies firstEnd={firstEnd} />
      <BtnInfos firstEnd={firstEnd} />
      {/* <mesh ref={sceneRef} />; */}
    </>
  );
}
