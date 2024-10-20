import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import { useTranslation } from "react-i18next";

interface MapComponentProps {
  floors: number;
  area: number;
  rooms: number;
  doors: number;
  windows: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  floors,
  area,
  rooms,
  doors,
  windows,
}) => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let view: __esri.SceneView;

    loadModules(
      [
        "esri/Map",
        "esri/views/SceneView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ],
      {
        css: true,
      }
    )
      .then(([Map, SceneView, Graphic, GraphicsLayer]) => {
        const map = new Map({
          basemap: "streets",
          ground: "world",
        });

        view = new SceneView({
          container: mapRef.current as HTMLDivElement,
          map: map,
          center: [46.743087172075775, 24.646426259028942],
          zoom: 19,
          viewingMode: "global",
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        view.on("click", (event) => {
          graphicsLayer.removeAll();

          const floorHeight = 3;
          const buildingWidth = Math.sqrt(area);
          const buildingDepth = buildingWidth;

          const building = new Graphic({
            geometry: {
              type: "polygon",
              rings: [
                [event.mapPoint.longitude, event.mapPoint.latitude],
                [
                  event.mapPoint.longitude + buildingWidth * 0.00001,
                  event.mapPoint.latitude,
                ],
                [
                  event.mapPoint.longitude + buildingWidth * 0.00001,
                  event.mapPoint.latitude + buildingDepth * 0.00001,
                ],
                [
                  event.mapPoint.longitude,
                  event.mapPoint.latitude + buildingDepth * 0.00001,
                ],
                [event.mapPoint.longitude, event.mapPoint.latitude],
              ],
            },
            symbol: {
              type: "polygon-3d",
              symbolLayers: [
                {
                  type: "extrude",
                  size: floorHeight,
                  material: { color: "green" },
                },
              ],
            },
            attributes: { floor: 1 },
            popupTemplate: {
              title: `${t("floor")} 1`,
              content: `${t("floorArea")}: ${area} ${t("area")}`,
            },
          });

          graphicsLayer.add(building);

          view.popup.open({
            location: event.mapPoint,
            title: t("popupTitle"),
            content: t("popupContent", { floors: 1, area, windows, doors }),
          });
        });
      })
      .catch((err) => console.error("ArcGIS loading error:", err));

    return () => {
      if (view) view.destroy();
    };
  }, [floors, area, rooms, doors, windows, t]);

  return (
    <div
      ref={mapRef}
      style={{ height: "600px", width: "100%", marginTop: "20px" }}
    ></div>
  );
};

export default MapComponent;
