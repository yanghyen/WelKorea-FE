import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const RoadView = () => {
  const roadviewRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");

  const [position, setPosition] = useState({ lat, lng });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!window.kakao || !mapRef.current || !roadviewRef.current) return;

    const kakao = window.kakao;
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    });

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
      map,
      draggable: true,
    });

    const updatePreview = (lat: number, lng: number) => {
      const position = new kakao.maps.LatLng(lat, lng);
      const roadviewClient = new kakao.maps.RoadviewClient();

      roadviewClient.getNearestPanoId(position, 50, (panoId: any) => {
        if (panoId && previewRef.current) {
          const rv = new kakao.maps.Roadview(previewRef.current);
          rv.setPanoId(panoId, position);
          setShowPreview(true);
        } else {
          setShowPreview(false);
        }
      });
    };

    kakao.maps.event.addListener(marker, "dragend", () => {
      const pos = marker.getPosition();
      const newLat = pos.getLat();
      const newLng = pos.getLng();
      setPosition({ lat: newLat, lng: newLng });
      updatePreview(newLat, newLng);
    });

    // 초기 프리뷰 표시
    updatePreview(lat, lng);
  }, [lat, lng]);

  const openFullRoadView = () => {
    const kakao = window.kakao;
    const pos = new kakao.maps.LatLng(position.lat, position.lng);
    const rv = new kakao.maps.Roadview(roadviewRef.current!);
    const client = new kakao.maps.RoadviewClient();

    client.getNearestPanoId(pos, 50, (panoId: any) => {
      if (panoId) {
        rv.setPanoId(panoId, pos);
        setShowPreview(false);
      } else {
        alert("해당 위치는 로드뷰를 지원하지 않습니다.");
      }
    });
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 100 }}>
      {/* 전체 로드뷰 */}
      <div
        ref={roadviewRef}
        style={{ width: "100%", height: showPreview ? "0%" : "50%", transition: "height 0.3s" }}
      />

      {/* 지도 영역 */}
      <div style={{ width: "100%", height: showPreview ? "100%" : "50%" }} ref={mapRef} />

      {/* 미리보기 로드뷰 (클릭 시 전체 로드뷰 활성화) */}
      {showPreview && (
        <div
          onClick={openFullRoadView}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 200,
            height: 120,
            zIndex: 110,
            border: "2px solid #fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          <div ref={previewRef} style={{ width: "100%", height: "100%" }} />
        </div>
      )}

      {/* 닫기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 120,
          background: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "6px 12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default RoadView;
