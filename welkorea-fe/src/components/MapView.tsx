import { useEffect, useRef, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";


const MapView = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef<any>(null);
    const markerInstance = useRef<any>(null);
    const [mapHeight, setMapHeight] = useState("100vh");

    const location = useGeolocation();

    // 실제 뷰포트 높이 적용
    useEffect(() => {
        const handleResize = () => {
            setMapHeight(`${window.innerHeight}px`);
        };

        handleResize(); // 초기 1회 실행
        window.addEventListener("resize", handleResize); // 리사이즈 대응

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!location || !window.kakao || !mapRef.current) return;
        const kakao = window.kakao;
        const container = mapRef.current; // 지도를 담을 영역의 DOM 참조

        const markerImage = new kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 아이콘 URL
            new kakao.maps.Size(24, 35) // 아이콘 크기
        );

        if (!mapInstance.current) {
            mapInstance.current = new kakao.maps.Map(container, {
                center: new kakao.maps.LatLng(location.lat, location.lng),
                level: 3,
            });

            markerInstance.current = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(location.lat, location.lng),
                map: mapInstance.current,
                image: markerImage,
            });

        } else {
            const newPosition = new kakao.maps.LatLng(
                location.lat,
                location.lng
            );
            mapInstance.current.setCenter(newPosition);
            markerInstance.current.setPosition(newPosition);
        }
    }, [location]);

    const handleMoveToCureentLocation = () => {
        if (!location || !mapInstance.current) return;
        const newPosition = new window.kakao.maps.LatLng(
            location.lat,
            location.lng
        );
        mapInstance.current.setCenter(newPosition);
        markerInstance.current.setPosition(newPosition);
    };

    return (
        <>
        <button
        onClick={handleMoveToCureentLocation}
        style={{
            position: "fixed",
            bottom: 100,
            right: 20,
            zIndex: 10,
            padding: "10px 15px",
            backgroundColor: "#000000cc",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
        }}  >내 위치로</button>
            <div
                ref={mapRef}
                style={{
                    width: "100%",
                    height: mapHeight,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}
            />
        </>
    );
};

export default MapView;
