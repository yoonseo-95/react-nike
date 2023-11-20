import React from "react";
import "./Map.scss";
import { SlLocationPin, SlPaperPlane, SlEarphonesAlt } from "react-icons/sl";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import mapImg from "../images/map_logo.png";
import { Link } from "react-router-dom";

export default function BasicMap() {
  const { kakao } = window;
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };
  // const currentCoordinate = await getCurrentCoordinate();
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("서울 나이키", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <section className="content">
      <div className="wrap">
        <div className="box1">
          <SlLocationPin className="icon" />
          <h3>매장 문의</h3>
          <p>전지역 나이키 매장 위치를 확인하세요.</p>
        </div>
        <div className="box2">
          <SlPaperPlane className="icon" />
          <h3>제품 및 주문 Email문의</h3>
          <Link to="mailto:service@nike.co.kr">
            <p>service@nike.co.kr</p>
          </Link>
        </div>
        <div className="box3">
          <SlEarphonesAlt className="icon" />
          <h3>고객센터 전화 문의</h3>
          <Link to="tel:080-022-0182">
            <p>080-022-0182</p>
          </Link>
        </div>
      </div>

      {location && (
        <Map
          center={{
            lat: location.latitude,
            lng: location.longitude,
          }}
          style={{
            width: "100%",
            height: "350px",
          }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
              image={{
                src: mapImg,
                size: {
                  width: 30,
                  height: 35,
                },
                options: {
                  offset: {
                    x: 27,
                    y: 69,
                  },
                },
              }}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#000" }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
        </Map>
      )}
    </section>
  );
}
