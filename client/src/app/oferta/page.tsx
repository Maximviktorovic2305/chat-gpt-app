/* eslint-disable @next/next/no-html-link-for-pages */

const Oferta = () => {
	const titleStyle = 'font-semibold mt-6'
	const blockStyle = 'font-semibold mt-4'

	return (
		<div className='bg-black3 p-6 text-base mt-5 max-w-[900px] mx-auto'>
			<h1 className='text-lg font-bold mb-4'>Договор оферты</h1>

			<h2 className={titleStyle}>1. Общие положения</h2>
			<p className='mt-2'>
				1.1. Настоящий договор оферты (далее – Договор) является публичной
				офертой ИП Кубряк Татьяна Алексеевна (далее – Исполнитель) и содержит
				все существенные условия оказания услуг по генерации изображений и
				анимаций с использованием технологий искусственного интеллекта через
				веб-сайт{' '}
				<a href='https://proxyai.pro' className='text-blue-600 hover:underline'>
					https://proxyai.pro
				</a>{' '}
				(далее – Сайт).
			</p>
			<p className='mt-2'>
				1.2. Регистрация Пользователя на Сайте считается полным и безоговорочным
				принятием условий настоящего Договора (акцептом).
			</p>

			<h2 className={titleStyle}>2. Предмет Договора</h2>
			<p className='mt-2'>
				2.1. Исполнитель обязуется оказать услуги по генерации изображений на
				основе текстовых запросов пользователя и дальнейшей обработке полученных
				изображений и анимаций, а пользователь обязуется оплатить эти услуги в
				порядке и на условиях, предусмотренных настоящим Договором.
			</p>

			<h2 className={titleStyle}>3. Права и обязанности сторон</h2>
			<h3 className={blockStyle}>3.1. Исполнитель обязуется:</h3>
			<p className='mt-2'>
				3.1.1. Оказать услуги качественно и в срок, согласно техническим
				требованиям Сайта.
			</p>
			<p className='mt-2'>
				3.1.2. Защищать конфиденциальность личных данных пользователя в
				соответствии с Федеральным законом О персональных данных.
			</p>
			<p className='mt-2'>
				3.1.3. Информировать пользователя о всех изменениях условий оказания
				услуг.
			</p>
			<p className='mt-2'>
				3.1.4. Исполнитель обязуется хранить заказы клиента в течение 20 дней,
				после чего заказы подлежат удалению.
			</p>

			<h3 className={blockStyle}>3.2. Пользователь обязуется:</h3>
			<p className='mt-2'>
				3.2.1. Своевременно и в полном объеме оплачивать услуги Исполнителя.
			</p>
			<p className='mt-2'>
				3.2.2. Воздержаться от создания запрещенного контента, включая, помимо
				прочего: контент для взрослых (18+), сексуализацию несовершеннолетних,
				контент, нарушающий авторские права, оскорбительный контент, а также
				контент, который является оскорбительным с религиозной или расовой точки
				зрения.
			</p>
			<p className='mt-2'>
				3.2.3. Воздержаться от использования полученных результатов в незаконной
				деятельности.
			</p>

			<h3 className={blockStyle}>3.3. Коммерческое использование</h3>
			<p className='mt-2'>
				3.3.1. Контент, генерируемый с помощью сервиса, пользователь может
				использовать в коммерческих целях.
			</p>

			<h2 className={titleStyle}>4. Оплата</h2>
			<p className='mt-2'>
				4.1. Стоимость услуг Исполнителя и порядок расчетов определяются в
				соответствии с тарифами, указанными на Сайте.
			</p>

			<h3 className={blockStyle}>Генерация изображений</h3>
			<p className='mt-2'>
				4.1.1. Стоимость генерации изображений составляет 5.28 руб. Одна
				генерация подразумевает получение 4-х изображений по 1.32 руб.
			</p>
			<p className='mt-2'>
				4.1.2. Стоимость быстрой генерации изображений составляет 10.56 руб.
				Одна генерация подразумевает получение 4-х изображений по 2.64 руб.
			</p>

			<h3 className={blockStyle}>Модификация изображений</h3>
			<p className='mt-2'>
				4.1.3. Стоимость модификации UPSCALE X2 CLASSIC и UPSCALE X2 CREATIVE
				составляет 1.67 руб. за генерацию (получаем одно изображение). Стоимость
				быстрой модификации данных параметров составляет 3.34 руб.
			</p>
			<p className='mt-2'>
				4.1.4. Стоимость модификации OUTPAINT X2, OUTPAINT X1.5, ТОЧНЫЕ
				ВАРИАЦИИ, ПОХОЖИЕ ВАРИАЦИИ, OUTPAINT LEFT, OUTPAINT RIGHT, OUTPAINT UP,
				OUTPAINT DOWN составляет 6.68 руб. за генерацию (получаем четыре
				изображения). Стоимость быстрой модификации данных параметров составляет
				13.36 руб.
			</p>

			<h3 className={blockStyle}>Анимация</h3>
			<p className='mt-2'>
				4.1.5. Стоимость создания анимации без финального кадра для версии Kling
				v.1.0 составляет: 29.04 руб. за 5 секунд, 58.08 руб. за 10 секунд.
				Стоимость продления анимации на 5 секунд составляет 29.04 руб.
			</p>
			<p className='mt-2'>
				4.1.6. Стоимость создания анимации с финальным кадром в версии Kling
				v.1.0 составляет 58.08 руб. за 5 секунд, 116.16 руб. за 10 секунд.
				Стоимость продления такой анимации на 5 секунд составляет 58.08 руб.
			</p>
			<p className='mt-2'>
				4.1.7. Стоимость создания анимации для версии Kling v.1.5 составляет:
				58.08 руб. за 5 секунд, 116.16 руб. за 10 секунд.
			</p>

			<h3 className={blockStyle}>Улучшение качества анимации</h3>
			<p className='mt-2'>
				4.1.8. Стоимость улучшения качества анимации до HD 0.62 руб. за секунду.
			</p>
			<p className='mt-2'>
				4.1.9. Стоимость улучшения качества анимации до Full HD 1.14 руб. за
				секунду.
			</p>
			<p className='mt-2'>
				4.1.10. Стоимость улучшения качества анимации до 4K 2.73 руб. за
				секунду.
			</p>

			<p className='mt-2'>
				4.2. Оплата услуг производится пользователем путем перечисления денежных
				средств через платежные системы, доступные на Сайте.
			</p>
			<p className='mt-2'>
				4.3. Средства на балансе предназначены исключительно для генераций и не
				подлежат возврату.
			</p>

			<h2 className={titleStyle}>5. Партнерская программа</h2>
			<p className='mt-2'>
				5.1. Клиентам доступна одноуровневая партнерская программа, в рамках
				которой Клиент может получать вознаграждение за привлечение новых
				пользователей.
			</p>
			<p className='mt-2'>
				5.2. Клиент имеет право получать 10% от суммы пополнений, сделанных
				привлеченными им партнерами, на свой внутренний баланс для работы в
				сервисе.
			</p>
			<p className='mt-2'>
				5.3. Ограничений на количество партнеров и вознаграждений нет. Клиент
				может привлекать любое количество новых пользователей и получать
				соответствующее вознаграждение за каждое пополнение, осуществленное ими.
			</p>
			<p className='mt-2'>
				5.4. Условия участия в партнерской программе могут быть изменены
				Администрацией сервиса, о чем Клиент будет уведомлен заранее.
			</p>

			<h2 className={titleStyle}>6. Ответственность сторон</h2>
			<p className='mt-2'>
				6.1. За неисполнение или ненадлежащее исполнение условий настоящего
				Договора стороны несут ответственность в соответствии с действующим
				законодательством Российской Федерации.
			</p>
			<p className='mt-2'>
				6.2. Пользователь берет на себя ответственность за создаваемый контент.
				Сервис не несет ответственность за генерируемый контент пользователями.
			</p>

			<h2 className={titleStyle}>7. Срок действия Договора</h2>
			<p className='mt-2'>
				7.1. Настоящий Договор вступает в силу с момента акцепта пользователем и
				действует до полного исполнения сторонами своих обязательств.
			</p>

			<h2 className={titleStyle}>8. Заключительные положения</h2>
			<p className='mt-2'>
				8.1. В случае любого нарушения условий, изложенных в настоящем Договоре,
				сервис оставляет за собой право приостановить или прекратить действие
				учетной записи Пользователя без каких-либо обязательств по возмещению
				средств.
			</p>
			<p className='mt-2'>
				8.2. Любые действия, предпринятые Пользователем, направленные на обход
				мер безопасности Сайта или нарушение его функциональности, приведут к
				немедленным ответным мерам, включая, помимо прочего, приостановку или
				прекращение действия учетной записи.
			</p>
			<p className='mt-2'>
				8.3. Все споры и разногласия, возникающие в связи с исполнением
				настоящего Договора, решаются путем переговоров. При недостижении
				соглашения спор передается на рассмотрение в суд в соответствии с
				действующим законодательством Российской Федерации.
			</p>
			<p className='mt-2'>
				8.4. Исполнитель вправе вносить изменения в настоящий Договор в
				одностороннем порядке. Изменения вступают в силу с момента их публикации
				на Сайте.
			</p>

			<h2 className={titleStyle}>Исполнитель:</h2>
			<p className='mt-2'>ИП Кубряк Татьяна Алексеевна</p>
			<p className='mt-2'>ИНН: 671205628381</p>
			<p className='mt-2'>ОГРН: 324670000021175</p>
			<p className='mt-2'>Телефон: +7-993-882-00-75</p>
			<p className='mt-2'>
				E-mail:{' '}
				<a
					href='mailto:tatyana.kubryak@yandex.ru'
					className='text-blue-600 hover:underline'>
					tatyana.kubryak@yandex.ru
				</a>
			</p>
         <div className='fixed text-gray1 top-5 right-5 flex items-center gap-3'>
				<a className='hover:text-white duration-200' href='/auth/register'>Регистрация</a>
				<a className='hover:text-white duration-200' href='/'>На главную</a>
			</div>
		</div>
	)
}

export default Oferta
