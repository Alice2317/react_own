export default function About() {

  return (
    <div className='container py-5'>
      <div className="row row-cols-1 row-cols-md-2 g-0">
        <div className="col bg-light align-content-center h-350">
          <h3 className="text-center">簡約細節，定義質感生活</h3>
        </div>
        <div className="col align-content-center p-3">
          <p className="text-center">
            OWN 致力於打破複雜，回歸穿著的本質。<br />
            我們精選高品質面料，結合人體工學剪裁，打造出兼具美感與舒適度的衣櫥必備單品。<br />
          </p>
        </div>
        <div className="col align-content-center custom-order-md-3 p-3">
          <ul>
            <li>精選面料： 嚴選透氣、耐穿的材質，確保長久陪伴。</li>
            <li>經典設計： 捨棄多餘裝飾，讓設計回歸線條本身。</li>
            <li>工藝堅持： 每一條縫線都經過嚴格把關，只為呈現完美的穿著體驗。</li>
          </ul>
        </div>
        <div className="col bg-light align-content-center h-350">
          <h3 className="text-center">品質保證</h3>
        </div>
      </div>
    </div>
  );
}