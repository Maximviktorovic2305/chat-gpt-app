'use client'

import Image from "next/image"

interface Props {
	isOpen?: boolean
}

const NeonLogo = ({ isOpen = true }: Props) => {
	return (
		isOpen && <Image width={170} height={70} className="mb-4" src='/logo.gif' alt="contact" />
	)
}

export default NeonLogo
