import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../contexts/Database.context";
import { SingleImageComponent } from "./SingleImage.Component";
import { FlatList } from "react-native";
import {styles} from "../style";

export const ImageCollectionComponent = ({ fetchData, navigation }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            const result = await fetchData();
            setData(result);
        };

        fetchDataAndSetData();
    }, [fetchData]);

    return (
        <View style={styles.imageContainer2}>
          {
            data && data.map((item, index) => {
              return (
                <SingleImageComponent key={index} initialIdx={index} data={data} filepath={item.path} navigation={navigation} />
              );
            })
          }
      </View>
    );
};
