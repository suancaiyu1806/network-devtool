import { useState } from "react";
import jsonBeautify from "json-beautify";
import { CodeHighlight } from "@douyinfe/semi-ui";
import {
  Tabs,
  TabPane,
  Typography,
  RadioGroup,
  Radio,
} from "@douyinfe/semi-ui";
import styles from "./App.module.scss";

function App() {
  const { Text } = Typography;
  const tabBar = useRef<HTMLElement>(null);
  const [requestList, setRequestList] = useState<any>([]);

  useEffect(() => {
    // @ts-ignore
    (chrome as any).devtools.network.onRequestFinished.addListener(function (
      request: any
    ) {
      setRequestList((prev: any) => [...prev, request]);
    });
  }, []);

  return (
    <Tabs
      tabPosition="left"
      className={styles.tabs}
      tabBarClassName={styles.tabBar}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DefaultTabBar ref={tabBar as any} {...tabBarProps} />
      )}
    >
      {requestList?.map((item: any, index: number) => (
        <TabPane
          key={index}
          itemKey={String(index)}
          className={styles.tabPane}
          tab={<Text className={styles.text}>{item.request.url}</Text>}
        >
          <Tabs>
            <TabPane itemKey="1" tab="Headers">
              <Text>Request</Text>
              {/* <CodeHighlight
                code={jsonBeautify(item.request.headers, null as any, 2, 100)}
              ></CodeHighlight> */}
              {item.request.headers
                ?.map?.((item) => {
                  return [item.name, item.value];
                })
                .json("\n")}
              <Text>Response</Text>
              <CodeHighlight
                code={jsonBeautify(item.response.headers, null as any, 2, 100)}
              ></CodeHighlight>
            </TabPane>
            <TabPane itemKey="2" tab="Request">
              <CodeHighlight
                code={jsonBeautify(item.request, null as any, 2, 100)}
              ></CodeHighlight>
            </TabPane>
            <TabPane itemKey="3" tab="Response">
              <CodeHighlight
                code={jsonBeautify(item.response, null as any, 2, 100)}
              ></CodeHighlight>
            </TabPane>
          </Tabs>
        </TabPane>
      ))}
    </Tabs>
  );
}

export default App;
