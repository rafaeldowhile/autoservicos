package br.com.autoservicos.resources;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.com.autoservicos.resources.dto.ErrorMessage;

@ControllerAdvice
public class RestExceptionProcess {

	@ExceptionHandler(Exception.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorMessage exception(HttpServletRequest req, Exception e) {
		ErrorMessage error = new ErrorMessage();
		error.setMensagemErro(e.getMessage());
		return error;
	}
}
