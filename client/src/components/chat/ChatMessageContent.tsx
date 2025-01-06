import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MessageContentProps {
	content: string
}

const ChatMessageContent: React.FC<MessageContentProps> = ({ content }) => {
	const codeBlockRegex = /```([\s\S]*?)```/g
	const parts = content.split(codeBlockRegex)

	return (
		<>
			{parts.map((part, index) => {
				const isCode = index % 2 === 1

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
							<p className='mt-1 text-gray-200'>{part}</p>
						)}
					</React.Fragment>
				)
			})}
		</>
	)
}

export default ChatMessageContent
