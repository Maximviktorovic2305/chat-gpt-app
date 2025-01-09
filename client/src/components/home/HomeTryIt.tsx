import ButtonTryIt from "../base/ButtonTryIt"


const HomeTryIt = () => {
  return (
    <section className="max-w-[700px] mx-auto flex flex-col my-20 gap-3 items-center justify-self-center">
      <div>Начните чат сейчас с Искусственныи Интеллектом</div>
      <div className="text-2xl">Чат с ИИ облегчает жизнь, оптимизируя рутину</div>
      <ButtonTryIt size="l" />   
    </section>
  )
}

export default HomeTryIt