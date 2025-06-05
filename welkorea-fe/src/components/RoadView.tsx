import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import goToCurrentLocationIcon from "../assets/go_to_current_location.png";
import { useGeolocation } from "../hooks/useGeolocation";

const RoadView = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const roadviewRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const roadviewInstance = useRef<any>(null);
    const markerInstance = useRef<any>(null);
    const roadviewClient = useRef<any>(null);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const lat = parseFloat(searchParams.get("lat") || "37.5665");
    const lng = parseFloat(searchParams.get("lng") || "126.9780");

    const location = useGeolocation();

    const [position, setPosition] = useState({ lat, lng });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [overlayOn, setOverlayOn] = useState(true);

    const updateRoadView = (lat: number, lng: number) => {
        const kakao = window.kakao;
        const pos = new kakao.maps.LatLng(lat, lng);
        roadviewClient.current.getNearestPanoId(pos, 50, (panoId: any) => {
            if (panoId) {
                roadviewInstance.current.setPanoId(panoId, pos);
            } else {
                setIsFullScreen(true); // 로드뷰 데이터 없으면 로드뷰 숨김
            }
        });
    };

    useEffect(() => {
        const kakao = window.kakao;
        if (!kakao || !mapRef.current || !roadviewRef.current) return;

        // 지도 초기화
        const map = new kakao.maps.Map(mapRef.current, {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
        });
        mapInstance.current = map;

        // 로드뷰 초기화
        const roadview = new kakao.maps.Roadview(roadviewRef.current);
        roadviewInstance.current = roadview;

        // 로드뷰 클라이언트
        roadviewClient.current = new kakao.maps.RoadviewClient();

        // 마커 이미지 설정
        const markerImage = new kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
            new kakao.maps.Size(26, 46),
            {
                spriteSize: new kakao.maps.Size(1666, 168),
                spriteOrigin: new kakao.maps.Point(705, 114),
                offset: new kakao.maps.Point(13, 46),
            }
        );

        // 마커 생성
        const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lng),
            image: markerImage,
            draggable: true,
            map,
        });
        markerInstance.current = marker;

        // 마커 드래그 시 로드뷰 업데이트
        kakao.maps.event.addListener(marker, "dragend", () => {
            const pos = marker.getPosition();
            setPosition({ lat: pos.getLat(), lng: pos.getLng() });
            updateRoadView(pos.getLat(), pos.getLng());
        });

        // 지도 클릭 시 마커 및 로드뷰 이동
        kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
            if (!overlayOn) return;
            const clickPos = mouseEvent.latLng;
            marker.setPosition(clickPos);
            updateRoadView(clickPos.getLat(), clickPos.getLng());
        });

        // 로드뷰 위치 변경 시 지도 중심 이동
        kakao.maps.event.addListener(roadview, "position_changed", () => {
            const pos = roadview.getPosition();
            map.setCenter(pos);
            if (overlayOn) marker.setPosition(pos);
        });

        // 초기 로드뷰 세팅
        updateRoadView(lat, lng);

        // 초기 오버레이 설정
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

        return () => {
            marker.setMap(null);
            mapInstance.current = null;
            roadviewInstance.current = null;
        };
    }, []);

    const toggleFullScreen = () => setIsFullScreen(prev => !prev);

    const handleMoveToCurrentLocation = () => {
        if (!location) return;
        const newLatLng = new window.kakao.maps.LatLng(location.lat, location.lng);
        mapInstance.current.setCenter(newLatLng);
        markerInstance.current.setPosition(newLatLng);
        updateRoadView(location.lat, location.lng);
    };

    const toggleOverlay = () => {
        if (!mapInstance.current) return;
        const map = mapInstance.current;
        if (!overlayOn) {
            map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
            markerInstance.current.setMap(map);
            updateRoadView(position.lat, position.lng);
        } else {
            map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
        }
        setOverlayOn(!overlayOn);
    };

    return (
        <div style={{ width: "100%", height: "100%", position: "fixed", top: 0, left: 0 }}>
            {/* 로드뷰 영역 */}
            <div
                ref={roadviewRef}
                style={{
                    width: "100%",
                    height: isFullScreen ? "100%" : "50%",
                    transition: "height 0.3s",
                    zIndex: 1,
                }}
            />

            {/* 지도 영역 */}
            <div
                ref={mapRef}
                style={{
                    width: "100%",
                    height: isFullScreen ? "0%" : "50%",
                    display: isFullScreen ? "none" : "block",
                    transition: "height 0.3s",
                    zIndex: 0,
                }}
            />

            {/* 전체 화면 토글 */}
            <button
                onClick={toggleFullScreen}
                style={floatingButtonStyle(20, 20)}
            >
                {isFullScreen ? "나가기" : "전체화면"}
            </button>

            {/* 닫기 */}
            <button
                onClick={() => navigate(-1)}
                style={floatingButtonStyle(20, undefined, 20)}
            >
                닫기
            </button>

            {/* 현재 위치 이동 */}
            <button
                onClick={handleMoveToCurrentLocation}
                style={circleButtonStyle(140)}
                aria-label="내 위치로 이동"
            >
                <img src={goToCurrentLocationIcon} alt="내 위치" style={{ width: 30, height: 30 }} />
            </button>

            {/* 오버레이 토글 */}
            <button
                onClick={toggleOverlay}
                style={floatingButtonStyle(70, 20)}
            >
                {overlayOn ? "도로 끄기" : "도로 보기"}
            </button>
        </div>
    );
};

const floatingButtonStyle = (top: number, right?: number, left?: number): React.CSSProperties => ({
    position: "absolute",
    top,
    right,
    left,
    zIndex: 10,
    padding: "8px 12px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 6,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
});

const circleButtonStyle = (bottom: number): React.CSSProperties => ({
    position: "fixed",
    bottom,
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
});

export default RoadView;
