import React from "react";
import styles from "./App.scss";

const App: React.FC = () => {
  return (
    <div className={styles.parent}>
      <span>This is a</span>
      <span>simple flexbox</span>
      <div className={styles.parentChild}>
        <span>This is another flexbox</span>
        <span>with column direction</span>
      </div>
    </div>
  );
};

export default App;
