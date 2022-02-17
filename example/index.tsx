import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Thing from '../.';
// import '../dist/react-lazy-image.min.css';
const App = () => {
  return (
    <div>
      <div style={{width: '100%',height: '1000px'}}>撒打飞机收款</div>
      <Thing
        src="https://fr-static.jiazhengye.cn/value_icon4@2x.cc24df57e19173b1.png" />
      <Thing
        width="100px"
        height="100px"
        failSrc="https://media.jiazhengye.cn/default/aunt_man.png?imageMogr2/auto-orient"
        src="https://fr-static.jiazhengye.cn/value_icon4@2x..png" />

      <div>图片测试</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
