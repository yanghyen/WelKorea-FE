import React, { useEffect } from "react";

export default function MapView() {
    console.log("🟡 MapView 컴포넌트 진입!");

    useEffect(() => {
        const loadKakaoMap = () => {
            console.log("🚀 SDK 로딩 시작")
            console.log('🚩 Kakao Map Key:', import.meta.env.VITE_KAKAO_MAP_KEY)
            
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false&libraries=services`;            // script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6e2377538e7c2d476494bdd32b7161a0&autoload=false&libraries=services`;
            script.onload = () => {
                console.log("✅ Kakao SDK loaded!");
                window.kakao.maps.load(() => {
                    console.log("✅ Kakao Map loaded!");
                    const container = document.getElementById("map")!;
                    const options = {
                        center: new window.kakao.maps.LatLng(37.5665, 126.978),
                        level: 3,
                    };
                    const map = new window.kakao.maps.Map(container, options);
                });
            };
            document.head.appendChild(script);
        };
        loadKakaoMap();
    }, []);

    return (
        <div
            id="map"
            style={{ width: "100%", height: "100vh", border: "1px solid red" }}
        />
    );
}
