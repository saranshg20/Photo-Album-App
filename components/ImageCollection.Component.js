import { View, Text } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../contexts/Database.context";
import { SingleImageComponent } from "./SingleImage.Component";
import { FlatList } from "react-native";
import {styles} from "../style";

export const ImageCollectionComponent = ({ fetchData }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            const result = await fetchData();
            setData(result);
        };

        fetchDataAndSetData();
    }, [fetchData]);

    return (
        <View>
        <FlatList
            style={styles.list}
          data={data}
          renderItem={({ item }) => <SingleImageComponent filepath={item.path} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
};
