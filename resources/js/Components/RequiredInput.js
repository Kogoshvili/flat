import React from 'react';
const renderField = ({ input, style, disabled, className, placeholder, type, meta: { touched, error, warning } }) => (
	<div>
		<input
			style={style}
			className={className}
			disabled={disabled}
			{...input}
			placeholder={placeholder}
			type={type}
		/>
		{touched &&
			((error && <span style={{ color: 'rgb(244, 67, 54)' }}>{error}</span>) ||
				(warning && <span>{warning}</span>))}
	</div>
);
export default renderField;
