import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageContentProps {
	content: string
}

const ChatMessageContent: React.FC<MessageContentProps> = ({ content }) => {
	const codeBlockRegex = /```([\s\S]*?)```/g
	const boldTextRegex = /\*\*(.*?)\*\*/g
	const parts = content.split(codeBlockRegex)

	return (
		<>
			{parts.map((part, index) => {
				const isCode = index % 2 === 1

				// Заменяем текст, заключенный в **, на жирный текст
				const formattedPart = part.split(boldTextRegex).map((text, i) => {
					if (i % 2 === 1) {
						return <strong key={i}>{text}</strong>
					}
					// Делим текст на строки и добавляем переносы <br />
					return text.split('\n').map((line, j) => (
						<span key={j}>
							{line}
							{line && <br />} {/* Добавляем перенос строки, если линия не пустая */}
						</span>
					));
				})

				return (
					<React.Fragment key={index}>
						{isCode ? (
							<SyntaxHighlighter
								language='javascript'
								style={nightOwl}
								customStyle={{
									backgroundColor: '#2F2F2F',
									color: '#DCDCDC',
									borderRadius: '5px',
									padding: '10px',
									fontSize: '0.85rem',
								}}>
								{part}
							</SyntaxHighlighter>
						) : (
							<p className='mt-1 text-gray-300'>{formattedPart}</p>
						)}
					</React.Fragment>
				)
			})}
		</>
	)
}

export default ChatMessageContent
