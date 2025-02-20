import React, { useState, useEffect } from "react";
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    ScaledSize,
} from "react-native";
import { Comic } from "@/state/comicSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import ZoomWrapper from "@ngenux/react-native-pinch-zoom-view";

export const ComicPanel: React.FC<{ comic: Comic }> = ({ comic }) => {
    const [windowDimensions, setWindowDimensions] = useState(
        Dimensions.get("window")
    );

    useEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
            setWindowDimensions((prevDimensions) => ({
                ...prevDimensions,
                ...window,
            }));
        };

        const dimensionsListener = Dimensions.addEventListener(
            "change",
            onChange
        );
        return () => dimensionsListener.remove();
    }, []);

    return (
        <View style={styles.container}>
            <ZoomWrapper
                style={styles.zoomElement}
                minZoom={1}
                maxZoom={5}
                zoomLevels={[]}
            >
                <Image
                    source={{ uri: comic.img }}
                    style={styles.image}
                    width={windowDimensions.width}
                />
            </ZoomWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        // width: "100%",
        width: 500,
        maxWidth: "98%",
        aspectRatio: 1,
        resizeMode: "contain",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    zoomElement: {
        // position: "absolute",
        width: "100%",
        height: "100%",
    },
});
