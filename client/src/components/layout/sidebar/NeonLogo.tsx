'use client'

interface Props {
	isOpen?: boolean
}

const NeonLogo = ({ isOpen }: Props) => {
	return (
		<iframe
			className={`mb-10 transition-opacity duration-300 ${
				isOpen ? 'block px-5 opacity-100' : 'hidden opacity-0'
			}`}
			src='//ntmaker.gfto.ru/newneontext/?image_height=70&image_width=200&image_font_shadow_width=2&image_font_size=36&image_background_color=141316&image_text_color=220FB2&image_font_shadow_color=9386E7&image_url=&image_text=Contact&image_font_family=RafaleRU&'
			frameBorder='no'
			scrolling='no'
			width='200'
			height='70'></iframe>
	)
}

export default NeonLogo
