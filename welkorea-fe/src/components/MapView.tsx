import { useEffect, useRef } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import currentLocationIcon from "../assets/current_location.png";
import roadViewIcon from "../assets/roadView.png";
import { useNavigate } from "react-router-dom";

interface MapViewProps {
    style?: React.CSSProperties;
}

const MapView = ({ style }: MapViewProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const markerInstance = useRef<any>(null);

    const location = useGeolocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.kakao || !location || !mapRef.current) return;

        const kakao = window.kakao;
        const container = mapRef.current;

        const markerImage = new kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            new kakao.maps.Size(24, 35)
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
        if (!location || !mapInstance.current || !markerInstance.current)
            return;
        const newPosition = new window.kakao.maps.LatLng(
            location.lat,
            location.lng
        );
        mapInstance.current.setCenter(newPosition);
        markerInstance.current.setPosition(newPosition);
    };

    const goToRoadView = () => {
        if (!mapInstance.current) return;
        const center = mapInstance.current.getCenter();
        navigate(`/roadview?lat=${center.getLat()}&lng=${center.getLng()}`);
    };

    return (
        <>
            {/* 내 위치 버튼 */}
            <button
                onClick={handleMoveToCureentLocation}
                style={{
                    position: "fixed",
                    bottom: 140,
                    right: 20,
                    zIndex: 10,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: 0,
                }}
                aria-label="내 위치로 이동"
            >
                <img
                    src={currentLocationIcon}
                    alt="내 위치"
                    style={{ width: 30, height: 30 }}
                />
            </button>

            {/* 로드뷰 버튼 */}
            <button
                onClick={goToRoadView}
                style={{
                    position: "fixed",
                    top: 200,
                    right: 20,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    fontSize: 12,
                    cursor: "pointer",
                    zIndex: 10,
                }}
                aria-label="로드뷰 열기"
            >
                <img
                    src={roadViewIcon}
                    alt="로드뷰"
                    style={{ width: 30, height: 30 }}
                />
            </button>

            {/* 지도 */}
            <div
                ref={mapRef}
                style={{
                    width: "100%",
                    height: "100%",
                    ...style,
                    zIndex: 0,
                }}
            />
        </>
    );
};

export default MapView;
