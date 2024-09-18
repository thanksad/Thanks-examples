/* eslint-disable react-native/no-inline-styles */
import {ThanksWidget} from '@thanksjs/react-native-webview';

import {
  ThanksWidgetController,
  thanksWidget,
} from '@thanksjs/react-native-webview';
import {View, Text, Button} from 'react-native';
import React, {ComponentProps, useState} from 'react';

type DirectWidgetProps = {
  onClose: ComponentProps<typeof ThanksWidget>['onClose'];
};

const DirectWidget = ({onClose}: DirectWidgetProps) => {
  return (
    <ThanksWidget
      // FIXME: this is thanksjs own Id
      partnerId="2a37e310-e0a2-46d0-b46b-0c55f902c169"
      statusText="thanks for being awesome"
      onClose={onClose ?? (() => {})}
    />
  );
};

const IndirectWidget = () => {
  return (
    <>
      <Button
        onPress={() =>
          thanksWidget.open({statusText: 'thanks for being awesome'})
        }
        title="Click here to Display Thanks"
      />
      <ThanksWidgetController
        // FIXME: this is thanksjs own Id
        partnerId="2a37e310-e0a2-46d0-b46b-0c55f902c169"
      />
    </>
  );
};

export default function App() {
  const [mode, setMode] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          width: '100%',
          height: '100%',
        }}>
        <Button
          title="display simple example"
          onPress={() => {
            setMode(1);
            setIsOpen(true);
          }}
        />
        <Button title="display indirect example" onPress={() => setMode(2)} />
        <Text>mode is: {['none', 'simple', 'indirect'][mode]}</Text>
        {new Array(20).fill(0).map((_, i) => (
          <Text key={i} style={{color: '#FFF'}}>
            {new Array(4).fill(' Thanks ').join('')}
          </Text>
        ))}
        {mode === 1 && isOpen && <DirectWidget onClose={handleClose} />}
        {mode === 2 && <IndirectWidget />}
      </View>
    </>
  );
}
