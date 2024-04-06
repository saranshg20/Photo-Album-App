import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { SingleImageComponent } from "./SingleImage.Component";
import { styles } from "../style";

/**
 * @param fetchData queries db to fetch table data containing image-path
 * @param navigation [A react-navigation function] to navigate to Gallery Screen to preview images in original dimension
 * @returns a collection of clicked images in grid format
 */
export const ImageCollectionComponent = ({ fetchData, navigation }) => {
    const [data, setData] = useState(null);

    // To fetch image-path data from db when mounted
    useEffect(() => {
        const fetchDataAndSetData = async () => {
            const result = await fetchData();
            setData(result);
        };

        fetchDataAndSetData();
    }, [fetchData]);

    return (
        <View style={styles.imageContainer2}>
            {data &&
                data.map((item, index) => {
                    return (
                        <SingleImageComponent
                            key={index}
                            initialIdx={index}
                            data={data}
                            filepath={item.path}
                            navigation={navigation}
                        />
                    );
                })}
        </View>
    );
};
