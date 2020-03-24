import React, {useEffect} from "react";
import PredictionTable from "../components/PredictionTable";
import Dashboard from "../components/Dashboard";
import useGlobal from "../store";


const Home = () => {

  const [globalState] = useGlobal();

  // const { auth } = globalState;

  // useEffect(() => {
  //   auth.handleAuthentication();
  // }, []);

  return (  
      <div className="w100">
          <Dashboard></Dashboard>
          {/* <PredictionTable></PredictionTable>                   */}
      </div>
  );
};

export default Home;
