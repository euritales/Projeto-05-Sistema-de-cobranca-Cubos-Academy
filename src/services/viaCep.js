async function getAddressByCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: "GET",
    });

    const { logradouro, bairro, localidade, uf, complemento, erro } =
      await response.json();

    if (erro) {
      return false;
    }
    return { logradouro, bairro, localidade, uf, complemento };
  } catch (error) {
    return false;
  }
}

export default getAddressByCep;
