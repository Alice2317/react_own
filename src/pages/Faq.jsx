const tabItems = [
  {
    id: 'shopping',
    title: '一、購物流程',
    content:
      '1.選擇【商品】。\n2.按【加入購物車】。\n3.在購物車按【結帳】。\n4.填寫相關資料，完成後按【確定】。\n5.確認訂單資訊，完成後按【結帳】。\n6.確認金額資訊，完成後按【確定】。'
  },
  {
    id: 'pay',
    title: '二、付款流程',
    content:
      '1.7-11超商取貨付款。\n2.全家超商取貨付款。\n3.線上刷卡。\n4.ATM轉帳。'
  },
  {
    id: 'transport',
    title: '三、運送方式',
    content:
      '【7-11、全家、萊爾富超商、OB門市取貨】\n1.單筆購物滿$1,000元即享免運費優惠，購物未滿$1,000元酌收物流服務費$60元。\n2.請於出貨後5日內完成取件，逾期退回無法重新出貨。\n3.台灣外島地區目前僅開放『全家便利商店』取貨服務。\n4.OB門市取貨、超商取貨不付款(或是$0元)訂單，須出示與包裹姓名相同的身分證明文件檢核方可領取。\n\n【黑貓宅配】\n1.物流服務費$120元。 \n2.黑貓宅配出貨後1-2天送達指定地點，宅配範圍限於台灣本島地區。\n3.請保持電話暢通避免錯過貨物送達，並於7日內完成簽收，逾期退回無法重新出貨。\n\n※ 注意事項：\n1.免運資格以單筆訂單實際金額計算(不含物流費、折價券、優惠碼、熊幣抵用金額)。'
  },
  {
    id: 'commodity',
    title: '四、退換貨方式',
    content:
      '【七天鑑賞期】\n由消費者完成簽收取件的隔日開始算起至第7天止，為七日鑑賞期限。\n退貨時商品必須是全新且完整包裝狀態。\n\n【瑕疵商品】\n瑕疵的定義︰布料破損、嚴重脫線、大片髒污、拉鍊壞掉等明顯瑕疵。\n須於七天鑑賞期內告知，超過期限無法受理\n\n【退貨說明】\n如欲取消訂單，於請訂單資訊中查詢訂單狀態為「未處理」可於線上自行取消。\n若您有換貨需求，請辦理退貨後再重新訂購。\n※提醒您：內衣、內褲、襪子等貼身衣物，基於衛生考量，恕不接受退換貨服務。\n若退貨後不符合滿額送贈品活動，請將贈品一併退回才可受理退貨服務(如未一同退回則視同願意以原價購買)。\n※提醒您：如因個人因素退貨次數過多，50%將會暫停或終止您在網站購物的權益與資格，敬請見諒。'
  }
];

export default function Faq() {

  return (
    <div className='container py-5'>
      <h3 className="text-center mb-2">FAQ</h3>
      {tabItems.map((item,index) => (
        <>
          <div className="accordion accordion-flush" key={item.id}>
            <div className="accordion-item">
              {index === 0 ? '' : (<hr />)}
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${item.id}`}
                >
                  {item.title}
                </button>
              </h2>
              <div
                id={item.id}
                className="accordion-collapse collapse"
              >
                <div className="accordion-body bg-light">
                  {item.content.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}