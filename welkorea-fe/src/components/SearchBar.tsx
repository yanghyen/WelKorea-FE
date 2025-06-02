import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const navigate = useNavigate();

    const goSearchPage = () => {
        navigate("/SearchPage");
    };

    return (
        <div
            onClick={goSearchPage}
            style={{
                padding: "10px",
                background: "#fff",
                zIndex: 100,
                height: "40px", // 클릭하기 편하게 높이 좀 키움
                borderRadius: "8px", // 둥근 모서리
                cursor: "pointer", // 마우스 올리면 클릭 가능 표시
                display: "flex",
                alignItems: "center",
            }}
        >
           <span style={{ color: "gray", padding: "15px" }}>Where do you want to go?</span>
        </div>
    );
}
