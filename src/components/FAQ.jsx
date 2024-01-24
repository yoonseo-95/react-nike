import React, { useEffect, useState } from "react";
import "./FAQ.scss";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { SlLocationPin, SlPaperPlane, SlEarphonesAlt } from "react-icons/sl";
import AOS from "aos";
import "aos/dist/aos.css";

import { Link } from "react-router-dom";

export default function FAQ() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [toggleAnswer, setToggleAnswer] = useState(0);
  const toggleFAQ = (index) => {
    if (toggleAnswer === index) {
      setToggleAnswer(0);
    } else {
      setToggleAnswer(index);
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="container">
      <div
        className="wrap"
        data-aos="fade-down"
        data-aos-delay="1600"
        data-aos-duration="1500"
      >
        <div className="box1">
          <SlLocationPin className="icon" />
          <h3>나이키 매장 문의</h3>
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

      <h2 data-aos="fade-down" data-aos-delay="1700" data-aos-duration="1500">
        자주 묻는 질문
      </h2>
      <div
        className="category-tabs"
        data-aos="fade-down"
        data-aos-delay="2000"
        data-aos-duration="1500"
      >
        <div
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          배송 및 주문
        </div>
        <div
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          반품 및 환불
        </div>
        <div
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          나이키 멤버십
        </div>
        <div
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          SNKRS
        </div>
        <div
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
          제품 정보
        </div>
      </div>
      <div
        className="content-tabs"
        data-aos="fade-down"
        data-aos-delay="1800"
        data-aos-duration="1500"
      >
        <div className={toggleState === 1 ? "active-content" : "content"}>
          <div className={toggleAnswer === 1 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 1 ? "active-title" : "title"}
              onClick={() => toggleFAQ(1)}
            >
              <h3>주문을 취소 및 주문 내용을 변경할 수 있나요?</h3>
              {toggleAnswer === 1 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>

            <div className={toggleAnswer === 1 ? "active-answer" : "answer"}>
              <p>
                <strong>주문 취소</strong>
                <br />
                주문 결제 후, 약 30분 이내에 '주문 취소' 버튼이 활성화되어있는
                상태라면 주문 취소가 가능합니다. 온라인에서 주문 취소를
                진행하시기 바랍니다.
                <br />
                <br />
                <strong>온라인에서 주문 취소하기</strong>
                <br />
                <br />
                1. 로그인 후, <strong>주문페이지를 접속</strong>
                <br /> 2. 취소하고자 하는 주문의 '주문 상세 보기' 누른 후, '주문
                취소' 버튼 누르기
                <br />
                <br />
                <strong>주문 취소 불가</strong>
                <br />
                <br />
                그러나 '주문 취소' 버튼이 활성화된 상태가 아니라면 해당 주문은
                취소가 불가하오니, 제품을 수령하신 후, 나이키가 제공하는{" "}
                <strong>무료 반품 서비스</strong>를 이용하시기 바랍니다.
                <br />
                <br />
                <strong>주문 변경</strong>
                <br />
                <br />
                이미 완료된 주문에 대해서는 제품 변경, 옵션, 수량 혹은 배송지
                변경이 불가합니다. 기존 주문을 취소하신 후, 원하시는 제품으로
                재주문해 주시기 바랍니다.
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 2 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 2 ? "active-title" : "title"}
              onClick={() => toggleFAQ(2)}
            >
              <h3>나이키의 배송옵션은 어떻게 되나요?</h3>
              {toggleAnswer === 2 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 2 ? "active-answer" : "answer"}>
              <p>
                나이키는 멤버와 비회원 고객 모두에게 무료배송 서비스를 제공하며,
                멤버에게는 특별 혜택인 ‘오늘도착 서비스’도 제공합니다
                <br />
                <br />
                <strong>일반 배송 서비스</strong>
                <br />
                <br />
                주문 결제 후, 약 3영업일 이내에 무료 배송이 완료됩니다.
                <br />
                <br />
                <strong>·</strong> 배송지가 관공서, 학교, 사무실인 경우에는 주말
                배송이 되지 않고, 차주 월요일 (영업일 기준)부터 순차적으로
                배송됩니다.
                <br />
                <br />
                <strong>·</strong> 다음의 경우, 배송이 지연될 수 있습니다:
                이벤트 기간 중 주문량 급증, 연휴로 인한 택배사 휴무, 기상 상황
                및 자연재해, 출고나 배송에 영향을 주는 통신 전산 장애, 택배사
                파업 등<br />
                <br />
                <strong>오늘도착 서비스</strong>
                <br />
                <br />
                오후 12시 이전에 주문 결제가 완료된 제품을 당일에 수령할 수 있는
                서비스입니다. 결제 전, 배송 옵션에서 오늘도착 서비스를 선택하면
                나이키가 멤버만을 위해 특별히 준비한
                <br /> 서비스를 경험하실 수 있습니다.
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 3 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 3 ? "active-title" : "title"}
              onClick={() => toggleFAQ(3)}
            >
              <h3>주문 및 배송 상황은 어떻게 조회할 수 있나요?</h3>
              {toggleAnswer === 3 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 3 ? "active-answer" : "answer"}>
              <p>
                나이키 주문의 가장 최신 상태 정보는 <strong>주문 페이지</strong>
                에서 확인하실 수 있습니다. 나이키 멤버는 로그인 후, 보다
                편리하게 주문 상태를 확인하실 수 있습니다.
                <br />
                <br />
                주문이 완료되면 나이키는 주문 번호와 함께 주문 내역을 조회할 수
                있는 링크를 휴대폰 문자메시지로 보내드립니다
                <br />
                <strong>주문 페이지</strong>에서도 직접 배송 상황을 확인하실 수
                있습니다. 멤버는 로그인 후, 주문 페이지의 '주문 상세 보기'
                버튼을 통해 손쉽게 조회할 수 있습니다.
                <br />
                <br />
                로그인 없이 주문하신 경우에는 주문번호와 이메일 주소로 로그인
                후, 위와 동일한 과정을 통해 배송 진행 상황을 확인하실 수
                있습니다.
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 4 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 4 ? "active-title" : "title"}
              onClick={() => toggleFAQ(4)}
            >
              <h3>결제 방법에는 어떤 것이 있나요?</h3>
              {toggleAnswer === 4 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 4 ? "active-answer" : "answer"}>
              <p>
                온라인 제품 구매시, 결제하실 수 있는 방법은 다음과 같습니다.
                <br />
                <br />
                <strong>·</strong> 신용카드/ 체크카드
                <br />
                <strong>·</strong> 카카오페이
                <br />
                <strong>·</strong> 네이버페이
                <br />
                <strong>·</strong> 페이코
                <br />
                <strong>·</strong> 실시간 계좌이체 (현금결제)
                <br />
                <br />
                단, <strong>나이키 앱 Line</strong>과{" "}
                <strong>SNKRS(Draw, Line) 제품은</strong> 카드로만 결제가
                가능합니다.
                <br />
                <br />
                멤버는 한 계정에 최대 4개의 카드 정보를 등록할 수 있습니다.
                더불어 카드 정보를 미리 등록하시면 보다 편리하게 결제 시스템을
                이용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        <div className={toggleState === 2 ? "active-content" : "content"}>
          <div className={toggleAnswer === 1 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 1 ? "active-title" : "title"}
              onClick={() => toggleFAQ(1)}
            >
              <h3>나이키의 반품정책은 어떻게 되나요?</h3>
              {toggleAnswer === 1 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>

            <div className={toggleAnswer === 1 ? "active-answer" : "answer"}>
              <p>
                나이키는 제품 수령일로부터 14일 동안 무료반품 서비스를
                제공합니다.
                <br />
                <br />
                나이키 멤버와 비회원 모두에게 무료로 서비스를 제공해 드리고
                있으니 부담 없이 제품을 구매하시기 바랍니다.
                <br />
                <br />
                <strong>·</strong> 색상/사이즈 불만족, 고객 변심 반품의 경우,
                오늘도착 서비스 배송 비용에 대한 환불은 불가한 점 유의하시기
                바랍니다.
                <br />
                <br />
                <strong>·</strong> 나이키 온라인에서 반품 접수를 하지 않고,
                택배사 어플 등을 통해 개별 반품 접수하는 경우에는 반품 및 환불에
                추가 시일이 소요될 수 있습니다.
                <br />
                <br />
                <strong>·</strong> 제품의 하자, 오배송, 기타 고객님이 받으신
                제품 등의 내용이 표시, 광고 내용과 다르거나 계약내용과 다르게
                이행된 경우에는 제품 등을 수령한 날로부터 3개월 이내/ 그 사실을
                알게된 날 또는 알 수 있었던 날로부터 30일 이내에 반품
                가능합니다.
                <br />
                <br />
                아래의 경우에는 반품이 불가하오니 반품 전에 확인해 주시기
                바랍니다.
                <br />
                <br />
                <strong>반품이 불가한 경우</strong>
                <br />
                <br />
                <strong>·</strong> 고객님의 단순 변심으로 인한 반품 요청이 제품
                수령일로부터 14일 경과된 경우
                <br />
                <br />
                <strong>·</strong> 포장 개봉 후 시착 또는 사용하여 제품의 가치가
                훼손된 경우 (단, 상품 확인을 위한 포장 개봉의 경우에는 반품
                가능)
                <br />
                <br />
                <strong>·</strong> 고객님의 책임 있는 사유로 제품 등의 가치가
                심하게 파손되거나 훼손된 경우
                <br />
                <br />
                <strong>·</strong> 신발 박스, 제품의 택과 라벨이 훼손 또는
                분실되어 재판매가 불가한 경우
                <br />
                <br />
                <strong>·</strong> 부속품이 반송되지 않은 경우 (단추, 액세서리,
                박스, 라벨 등)
                <br />
                <br />
                <strong>·</strong> 기타 '전자상거래 등에서의 소비자보호에 관한
                법률'이 정하는 청약철회 제한 사유에 해당되는 경우
                <br />
                <br />
                <strong>·</strong> 커스텀 서비스 제품 (제품 혹은 패치나 마킹이
                불량인 경우에는 A/S 신청을 통해 반품 판정을 받은 경우에만 가능)
                <br />
                <br />
                <strong>·</strong> 나이키 온라인 (나이키 앱, 나이키닷컴, SNKRS
                앱)에서 구매하지 않은 제품인 경우
                <br />
                <br />
                <strong>·</strong> Apple Watch 관련 제품의 포장이 개봉된 경우
                <br />
                <br />
                <strong>·</strong> 수영복 제품의 위생 테이프가 제거된 경우
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 2 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 2 ? "active-title" : "title"}
              onClick={() => toggleFAQ(2)}
            >
              <h3>온라인 구매 제품 반품 어떻게 진행해야하나요?</h3>
              {toggleAnswer === 2 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 2 ? "active-answer" : "answer"}>
              <p>
                온라인으로 구매한 나이키 제품은 제품 수령일로부터{" "}
                <strong>14일 이내에 반품 가능</strong>합니다. 나이키 멤버와
                비회원 모두에게 무료로 서비스를 제공하며, 반품 방법은 아래와
                같습니다.
                <br />
                <br />
                <strong>나이키 매장으로 반품하기</strong>
                <br />
                <br />
                나이키 멤버와 비회원 모두 온라인으로 구매한 제품을 나이키
                매장으로 반품하실 수 있습니다. 아래의 안내에 따라 반품 접수
                부탁드립니다.
                <br />
                <br />
                1. 반품 서비스 제공 매장 확인하기
                <br />
                <br />
                2. 주문 시 사용한 이메일 주소와 주문 번호 (혹은 바코드), 그리고
                반품하고자 하는 제품을 지참하여 매장 애슬릿에게 전달하기
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;주문 번호(혹은 바코드)는 나이키에서
                받으신 주문 완료 문자 메시지에서도 확인하실 수 있습니다.
                <br />
                <br />
                3. 매장 애슬릿이 반품하고자 하는 제품의 주문 내역 확인 후, 반품
                접수 진행
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 3 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 3 ? "active-title" : "title"}
              onClick={() => toggleFAQ(3)}
            >
              <h3>나이키의 환불 절차는 어떻게 되나요?</h3>
              {toggleAnswer === 3 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 3 ? "active-answer" : "answer"}>
              <p>
                반품의 검수가 완료되면 반품 확정 여부가 휴대폰 문자메시지로
                안내됩니다.
                <br />
                <br />
                반품 확정 처리 후, 나이키에서 결제 승인이 취소되고 바로 환불
                절차가 진행됩니다
                <br />
                <br />
                <strong>신용카드/ 체크카드 환불</strong>
                <br />
                <br />
                - 결제 승인 취소 후, 약 3영업일 이내에 카드사에서 취소내역을
                확인하실 수 있습니다.
                <br />
                <br />
                - 단, 결제일이 이전 달인 경우에는 결제일의 다음 달 대금 청구
                시에 해당 금액이 환급처리됩니다.
                <br />
                <br />
                <strong>카카오페이</strong>
                <br />
                <br />
                - 결제 승인 취소 후, 카드는 약 3영업일 이내에 취소내역을
                확인하실 수 있으며, 카카오머니는 즉시 환불됩니다.
                <br />
                <br />
                - 카카오페이로 발송되는 알림 톡은 취소 즉시 발송되며,
                카드사로부터 받는 문자는 결제 취소 완료 후 발송됩니다.
                <br />
                <br />
                - 자세한 사항은 카카오페이 고객센터로 문의 바랍니다.
                <br />
                <br />
                <strong>네이버페이</strong>
                <br />
                <br />
                - 결제 승인 취소 후, 카드는 약 3~5영업일 이내에 취소 내역을
                확인하실 수 있으며, 네이버페이 머니/포인트는 즉시 재충전/
                재적립됩니다.
                <br />
                <br />
                - 결제 수단에 따라 환불 방법 및 기간이 다르게 적용됩니다.
                <br />
                <br />
                - 자세한 사항은 네이버페이 고객센터로 문의 바랍니다.
                <br />
                <br />
                <strong>현금 환불 (실시간 계좌이체)</strong>
                <br />
                <br />
                - 실시간 계좌이체로 결제하신 경우에는 고객님의 은행 계좌로
                환불해 드립니다. 결제 승인 취소 후, 약 3영업일 이내로 환불
                금액이 반영됩니다.
                <br />
                <br />
                <strong>유의사항</strong>
                <br />
                <br />
                멤버데이즈와 같이 주문 및 고객 문의가 증가하는 기간에는 환불이
                다소 지연될 수 있습니다.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className={toggleState === 3 ? "active-content" : "content"}>
          <div className={toggleAnswer === 1 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 1 ? "active-title" : "title"}
              onClick={() => toggleFAQ(1)}
            >
              <h3>나이키 멤버가 되면 어떤 혜택을 받나요?</h3>
              {toggleAnswer === 1 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>

            <div className={toggleAnswer === 1 ? "active-answer" : "answer"}>
              <p>
                나이키는 멤버 여러분께 다양한 혜택을 드리기 위해 항상 노력하고
                있습니다. 멤버에 가입하신 후, 나이키가 준비한 다양한 혜택이
                제공됩니다.
                <br />
                <br />
                <strong>MEMBER SHOP</strong>
                <br />
                <br />
                - 멤버에게는 특별 제품 구매 기회와 신제품 우선 구매 기회를
                제공합니다.
                <br />
                <br />
                <strong>SPECIAL EVENT & SERVICE</strong>
                <br />
                <br />
                - 멤버는 시즌별로 나이키가 준비한 이벤트와 서비스를 누릴 수
                있습니다.
                <br />
                <br />
                <strong>오늘도착 서비스</strong>
                <br />
                <br />
                - 멤버에게는 온라인으로 주문한 제품을 당일에 받아 볼 수 있는
                오늘도착 서비스를 제공합니다.
                <br />
                <br />
                <strong>프로모션 쿠폰 혜택</strong>
                <br />
                <br />
                - 멤버에게는 웰컴 프로모션 쿠폰과 생일 프로모션 쿠폰 등 다양한
                할인 혜택을 제공합니다.
                <br />
                <br />
                <strong>나이키 매장에서의 다양한 혜택</strong>
                <br />
                <br />
                - 멤버를 위해 나이키 매장에서는 Fast Lane, Early Access, 멤버
                프로모션 등의 다양한 이벤트와 맞춤형 서비스를 준비합니다. (단,
                나이키 멤버 서비스 및 제공 혜택은 매장별로 다를 수 있습니다.)
                <br />
                <br />
                <strong>
                  나이키의 디지털 환경을 하나의 계정으로 이용할 수 있는 서비스
                  제공
                </strong>
                <br />
                <br />- 멤버는 하나의 나이키 계정으로 나이키닷컴을 비롯하여{" "}
                <strong>나이키 앱, NRC, NTC</strong> 앱도 함께 이용할 수
                있습니다.
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 2 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 2 ? "active-title" : "title"}
              onClick={() => toggleFAQ(2)}
            >
              <h3>프로모션 쿠폰 혜택 및 사용방법 (생일, 웰컴쿠폰 등)</h3>
              {toggleAnswer === 2 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 2 ? "active-answer" : "answer"}>
              <p>
                온라인으로 구매한 나이키 제품은 제품 수령일로부터{" "}
                <strong>14일 이내에 반품 가능</strong>합니다. 나이키 멤버와
                비회원 모두에게 무료로 서비스를 제공하며, 반품 방법은 아래와
                같습니다.
                <br />
                <br />
                <strong>나이키 매장으로 반품하기</strong>
                <br />
                <br />
                나이키 멤버와 비회원 모두 온라인으로 구매한 제품을 나이키
                매장으로 반품하실 수 있습니다. 아래의 안내에 따라 반품 접수
                부탁드립니다.
                <br />
                <br />
                1. 반품 서비스 제공 매장 확인하기
                <br />
                <br />
                2. 주문 시 사용한 이메일 주소와 주문 번호 (혹은 바코드), 그리고
                반품하고자 하는 제품을 지참하여 매장 애슬릿에게 전달하기
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;주문 번호(혹은 바코드)는 나이키에서
                받으신 주문 완료 문자 메시지에서도 확인하실 수 있습니다.
                <br />
                <br />
                3. 매장 애슬릿이 반품하고자 하는 제품의 주문 내역 확인 후, 반품
                접수 진행
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 3 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 3 ? "active-title" : "title"}
              onClick={() => toggleFAQ(3)}
            >
              <h3>NRC와 NTC 안내</h3>
              {toggleAnswer === 3 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 3 ? "active-answer" : "answer"}>
              <p>
                반품의 검수가 완료되면 반품 확정 여부가 휴대폰 문자메시지로
                안내됩니다.
                <br />
                <br />
                반품 확정 처리 후, 나이키에서 결제 승인이 취소되고 바로 환불
                절차가 진행됩니다
                <br />
                <br />
                <strong>신용카드/ 체크카드 환불</strong>
                <br />
                <br />
                - 결제 승인 취소 후, 약 3영업일 이내에 카드사에서 취소내역을
                확인하실 수 있습니다.
                <br />
                <br />
                - 단, 결제일이 이전 달인 경우에는 결제일의 다음 달 대금 청구
                시에 해당 금액이 환급처리됩니다.
                <br />
                <br />
                <strong>카카오페이</strong>
                <br />
                <br />
                - 결제 승인 취소 후, 카드는 약 3영업일 이내에 취소내역을
                확인하실 수 있으며, 카카오머니는 즉시 환불됩니다.
                <br />
                <br />
                - 카카오페이로 발송되는 알림 톡은 취소 즉시 발송되며,
                카드사로부터 받는 문자는 결제 취소 완료 후 발송됩니다.
                <br />
                <br />
                - 자세한 사항은 카카오페이 고객센터로 문의 바랍니다.
                <br />
                <br />
                <strong>네이버페이</strong>
                <br />
                <br />
                - 결제 승인 취소 후, 카드는 약 3~5영업일 이내에 취소 내역을
                확인하실 수 있으며, 네이버페이 머니/포인트는 즉시 재충전/
                재적립됩니다.
                <br />
                <br />
                - 결제 수단에 따라 환불 방법 및 기간이 다르게 적용됩니다.
                <br />
                <br />
                - 자세한 사항은 네이버페이 고객센터로 문의 바랍니다.
                <br />
                <br />
                <strong>현금 환불 (실시간 계좌이체)</strong>
                <br />
                <br />
                - 실시간 계좌이체로 결제하신 경우에는 고객님의 은행 계좌로
                환불해 드립니다. 결제 승인 취소 후, 약 3영업일 이내로 환불
                금액이 반영됩니다.
                <br />
                <br />
                <strong>유의사항</strong>
                <br />
                <br />
                멤버데이즈와 같이 주문 및 고객 문의가 증가하는 기간에는 환불이
                다소 지연될 수 있습니다.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className={toggleState === 4 ? "active-content" : "content"}>
          <div className={toggleAnswer === 1 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 1 ? "active-title" : "title"}
              onClick={() => toggleFAQ(1)}
            >
              <h3>Draw는 어떻게 응모하나요?</h3>
              {toggleAnswer === 1 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>

            <div className={toggleAnswer === 1 ? "active-answer" : "answer"}>
              <p>
                나이키는 Draw를 통해 한정판 제품에 대한 구매 기회를 제공합니다.
                Draw를 통해서 인기 높은 SNKRS 제품을 구매할 수 있는 기회를
                잡으시기 바라며, Draw는 참여 시간에 제한이 있는 점 유의하시기
                바랍니다.
                <br />
                <br />
                <strong>Draw 응모 방법</strong>
                <br />
                <br />- Draw 시작 전에 <strong>나이키에 로그인</strong>하세요.
                <br />
                <br />
                - Draw가 시작되면, 사이즈 선택 후 '응모하기' 버튼을 누르세요.
                <br />
                <br />
                - 배송지와 결제 정보를 입력하세요.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;-{" "}
                <strong>Draw는 카드와 저장된 카카오페이로만 결제</strong>가
                가능합니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 프로필에 배송지 정보와 결제 정보를 미리
                저장하지 않았다면 주문 시에 입력해야 합니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 배송지 주소는 추후 수정이 불가합니다. 주문
                시 정확하게 입력해 주세요.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 정보 입력 시, 결제 정보에 입력한{" "}
                <strong>청구 주소와</strong> 배송지에 입력한{" "}
                <strong>배송 주소가 일치</strong>해야 합니다.
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;도로명 주소 및 아파트 동, 호수
                등의 <strong>띄어쓰기</strong>도 일치해야 하는 점 주의하시기
                바랍니다.
                <br />
                <br />
                - '결제하기' 버튼을 누르면 응모가 완료됩니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 당첨된 경우에만 선택하신 결제 수단으로
                금액이 청구되며, 당첨되지 않은 경우에는 금액이 청구되지
                않습니다.
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 2 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 2 ? "active-title" : "title"}
              onClick={() => toggleFAQ(2)}
            >
              <h3>SNKRS와 나이키 온라인에서의 구매방법이 다른가요?</h3>
              {toggleAnswer === 2 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 2 ? "active-answer" : "answer"}>
              <p>
                아이코닉 스타일을 재해석한 제품부터 멤버 전용 컬래버레이션
                제품까지 나이키에서 가장 인기 높은 제품들을 SNKRS에서
                만나보세요. 출시되는 제품 대부분의 수량이
                <br /> 한정되어 있어서 빠르게 품절되지만, 아래의 과정을 통해
                구매 확률을 높일 수 있습니다.
                <br />
                <br />
                <br />
                <br />
                SNKRS 결제 방법은 나이키 온라인 제품의 결제 방법과 다른 점
                참고하시어 아래의 내용 확인해 주시기 바랍니다.
                <br />
                <br />
                <strong>제품 구매 준비하기</strong>
                <br />
                <br />
                - 가입 후 SNKRS에서 누릴 수 있는 멤버만의 혜택을 경험해 보세요.
                <br />
                <br />
                - 신속한 주문 결제를 위해 나이키 멤버 프로필에 신발 사이즈와
                배송지 정보, 결제 정보를 미리 저장하세요
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- Draw 와 Line을 통한 제품 구매는 카드와
                저장된 카카오페이로만 결제가 가능합니다. 카드와 카카오페이
                정보를 미리 저장하시면 빠른 결제 진행이 가능합니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 정보 입력 시, 결제 정보에 입력한 청구 주소와
                배송지에 입력한 배송지 주소가 일치해야 합니다. 도로명 주소 및
                아파트 동, 호수 등의 띄어쓰기도 일치해야 하는 점 주의하시기
                바랍니다.
                <br />
                <br />
                - 휴대폰 번호를 인증을 진행해 주세요.
                <br />
                <br />
                - 출시되는 SNKRS 제품의 출시 일정을 확인하여 구매 기회를 놓치지
                마세요.
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 3 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 3 ? "active-title" : "title"}
              onClick={() => toggleFAQ(3)}
            >
              <h3>SNKRS 결제 방법은 어떻게 되나요?</h3>
              {toggleAnswer === 3 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 3 ? "active-answer" : "answer"}>
              <p>
                Draw와 Line을 비롯한 SNKRS 제품 구매를 위해서는 결제 정보가 먼저
                제공되어야 하며, 카드와 저장된 카카오페이로만 결제가 가능합니다.
                <br />
                <br />
                <strong>결제 프로세스</strong>
                <br />
                <br />
                - Draw 응모와 Line 참여를 위해서는 응모 과정에서 결제정보가
                제공되어야 합니다.
                <br />
                <br />
                - Draw 응모와 Line 참여 시, 제품의 결제는 카드와 저장된
                카카오페이로만 진행 가능합니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 빠른 응모 진행을 위해 카드 정보를 미리
                저장하는 것을 추천드립니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 빠른 응모 진행을 위해 저장된 카카오페이를
                사용할 수 있도록 정보를 미리 등록하는 것을 추천드립니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- SNKRS 앱에서 처음으로 Draw 응모와 Line
                참여하시는 경우에는 저장하신 결제 수단 (신용카드, 저장된
                카카오페이) 정보가 조회되는지 먼저 확인하시기 바랍니다.
                <br />
                <br />
                - 결제 시 사용된 카드 정보와 카카오페이 정보는 저장되어 추후에는
                더 빠르게 응모할 수 있습니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 카카오페이를 포함하여 최대 4개의 결제 정보
                저장이 가능합니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 카카오페이는 나이키 계정 당 한 개의
                결제정보만 저장할 수 있습니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;- iOS (iPhone) 기기를 사용하시는 경우,
                사파리 브라우저를 통해 카카오페이를 사용하시기 바랍니다. (크롬
                브라우저를 사용하실 경우, 카카오페이 이용에 어려움이 있을 수
                있습니다)
                <br />
                <br />
                - Draw에 당첨되거나 Line 참여 후, 제품을 구매하는 과정에서
                사전에 제공된 결제 정보로 주문과 결제가 즉시 진행됩니다. 단,
                결제 정보가 유효하지 않을 경우(잔고 부족, 카드 유효기간 만료
                등)에는 주문이 처리되지 않습니다.
                <br />
                <br />
                - Draw에 당첨되지 않거나 Line으로 구매하지 못한 경우에는 결제
                또한 진행되지 않습니다
                <br />
                <br />
                - Draw 응모와 Line 참여 시, 배송지 정보를 정확하게 입력 및
                확인해 주시기 바랍니다. 제품 주문 및 결제가 완료된 후에는 배송지
                정보 변경이 불가합니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 정보 입력 시, 결제 정보에 입력한 청구 주소와
                배송지에 입력한 배송지 주소가 일치해야 합니다. 도로명 주소 및
                아파트 동, 호수 등의 띄어쓰기도 일치해야 하는 점 주의하시기
                바랍니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 카드 정보 수정이 필요하신 경우에는 등록된
                카드 정보 삭제 후, 재등록하는 방법을 추천드립니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 저장된 카카오페이 정보의 배송지 수정은
                불가합니다. 프로필에서 삭제 후, 재등록하시기 바랍니다.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className={toggleState === 5 ? "active-content" : "content"}>
          <div className={toggleAnswer === 1 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 1 ? "active-title" : "title"}
              onClick={() => toggleFAQ(1)}
            >
              <h3>나이키의 A/S 절차는 어떻게 진행되나요?</h3>
              {toggleAnswer === 1 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>

            <div className={toggleAnswer === 1 ? "active-answer" : "answer"}>
              <p>
                나이키는 소비자 분쟁 해결기준 품목별 내용연수를 기준하여 A/S
                서비스를 제공해 드리고 있습니다. 제품 구매 후, 품질에 이상이
                생겼을 경우에는 나이키의 A/S 서비스를 경험해 보세요.
                <br />
                <br />
                <strong>A/S 접수</strong>
                <br />
                <br />
                아래의 경우, <strong>나이키코리아 고객센터</strong>
                (080-022-0182)에 A/S를 접수해주시기 바랍니다. 더불어 제품
                주문자인 본인 외에는 A/S 접수가 불가한 점 유의하시기 바랍니다.
                <br />
                <br />
                - 나이키닷컴에서 멤버 로그인 후 구매한 경우
                <br />
                <br />
                - 나이키닷컴에서 비회원으로 구매한 경우
                <br />
                <br />
                - 나이키 매장에서 Assist Service를 통해 구매한 경우
                <br />
                <br />
                <strong>A/S 판정 기준</strong>
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 1. 나이키 매장에서 구매하신 경우에는 해당
                매장에서만 A/S 접수가 가능합니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 2. <strong>
                  Apple Watch Nike의 A/S
                </strong>는 <strong>Apple 공식 서비스센터</strong>로 문의 또는
                방문하시어 안내 받으시기 바랍니다.
                <br />
                <br />
                <strong>유의사항</strong>
                <br />
                <br />
                나이키 소비자 상담실에서 A/S 가능 여부 판정이 이루어지며, 판정
                기준은 아래와 같습니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 품질보증기간
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 내용 연수 경과 여부
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 제품 하자 여부
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 소비자 과실 여부
                <br />
                <br />
                <strong>A/S 판정 결과</strong>
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 제품의 수선이 불가능할 경우, 반품 또는
                회송이 이루어집니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 제품의 수선이 가능한 경우, 수선비용이 부가될
                수 있으며, 수선에는 A/S 수선 접수일 기준으로 약 15~20일이
                소요됩니다.
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;- 제품 불량 판정으로 환불이 진행될 경우,
                나이키 소비자 상담실에서 보내드리는 휴대폰 문자 및 상담원과의
                통화를 통해 환불계좌 정보 입력이 필요합니다. 주문자와 예금주가
                동일한 계좌 정보가 제공되어야 하는 점 유의하시기 바랍니다. 약
                10~14영업일 후에 환불 처리가 완료되며, 주 1회 환불이 진행되고
                있습니다.
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 2 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 2 ? "active-title" : "title"}
              onClick={() => toggleFAQ(2)}
            >
              <h3>나이키 제품의 사이즈 정보는 어떻게 알 수 있나요?</h3>
              {toggleAnswer === 2 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 2 ? "active-answer" : "answer"}>
              <p>
                좋은 퍼포먼스를 내기 위해서는 착용하는 옷과 장비의 알맞은
                사이즈가 중요합니다. 최상의 퍼포먼스를 내실 수 있도록 나이키에서
                도와드리겠습니다.
                <br />
                <br />
                어떤 사이즈의 옷과 신발을 선택해야 할지 모르신다면 아래의 버튼을
                통해 알아보세요. 남성, 여성, 남녀 공용, 아동 제품을 비롯하여
                아시아 사이즈, US 사이즈 등 모든 제품의 사이즈를 안내해 드리고
                있습니다.
                <br />
                <br />
                더불어 각 제품 페이지에서도 링크를 통해 알아보실 수 있습니다.
                <br />
                <br />
                만약 구매하신 제품의 사이즈가 맞지 않으실 경우, 나이키의{" "}
                <strong>무료반품 서비스</strong>를 통해 손쉽게 환불하실 수 있는
                점 잊지 말아주세요.
                <br />
                <br />
              </p>
            </div>
          </div>
          <div className={toggleAnswer === 3 ? "active-question" : "question"}>
            <div
              className={toggleAnswer === 3 ? "active-title" : "title"}
              onClick={() => toggleFAQ(3)}
            >
              <h3>나이키 신발을 재활용할 수 있나요?</h3>
              {toggleAnswer === 3 ? (
                <TfiAngleUp className="icon" />
              ) : (
                <TfiAngleDown className="icon" />
              )}
            </div>
            <div className={toggleAnswer === 3 ? "active-answer" : "answer"}>
              <p>
                네, 러닝이나 코트 위 경기, 필드 위 질주가 더 이상 어려운 신발은
                재활용이 가능합니다.
                <br />
                <br />
                나이키에서는 중고 운동화와 의류를 재활용 및 기부하고 있습니다.
                이는 탄소 제로, 폐기물 제로를 향한 나이키의{" "}
                <strong>Move to Zero</strong> 여정 중 하나입니다. 사용한
                운동화를 캠페인 참여 매장에 가져다 주시면, 재활용 가능 제품과
                세탁 후 기부 가능한 제품으로 분류하게 됩니다. 두 방법 모두
                쓰레기를 줄이는 데 도움이 될 수 있습니다.
                <br />
                <br />
                대부분의 매장에서 <strong>브랜드에 상관 없이</strong> 운동화를
                수거하고 있지만, 샌들과 구두, 부츠, 금속이 달린 신발(클리트 또는
                스파이크)은 접수가 불가능합니다. 근처 나이키 매장에서 신발을
                수거하는지 먼저 확인하세요.
                <br />
                <br />
                운동용 상의나 하의는{" "}
                <strong>브랜드에 상관 없이 일부 매장</strong>으로 가져오실 수
                있지만 양말이나 속옷, 금속(스냅, 지퍼, 버튼)이 달린 의류는
                접수가 불가능합니다.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
