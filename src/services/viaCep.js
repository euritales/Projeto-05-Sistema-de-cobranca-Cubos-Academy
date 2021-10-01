async function getAddressByCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: "GET",
    });

    const { logradouro, bairro, localidade, complemento, erro } =
      await response.json();

    if (erro) {
      return false;
    }
    return { logradouro, complemento, bairro, localidade };
  } catch (error) {
    return false;
  }
}

export default getAddressByCep;
