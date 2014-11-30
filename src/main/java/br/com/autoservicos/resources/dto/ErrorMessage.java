package br.com.autoservicos.resources.dto;

import java.io.Serializable;

import com.fasterxml.jackson.databind.deser.std.ThrowableDeserializer;

public class ErrorMessage extends ThrowableDeserializer implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String codigo;
	private String mensagemErro;
	
	public ErrorMessage() {
		super(null);
	}
	
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getMensagemErro() {
		return mensagemErro;
	}
	public void setMensagemErro(String mensagemErro) {
		this.mensagemErro = mensagemErro;
	}

	
}
