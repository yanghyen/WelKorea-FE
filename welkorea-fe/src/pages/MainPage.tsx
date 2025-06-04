import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";
import BottomPanel from "../components/BottomPanel";
import CategorySelector from "../components/CategorySelector";
import FooterNav from "../components/FooterNav";

export default function MainPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    return (
        <div style={{width:"100vw", height: "100vh", position: "relative" }}>
            <MapView />
            <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  right: 20,
                  zIndex: 10,
                }}
            >
                <SearchBar /><p />
                <CategorySelector
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </div>
                <BottomPanel />
                <FooterNav />
        </div>
    );
}
