import ErrorMessage from "../components/ToastifyPopups/errorMessage";

async function getAddressByCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: "GET",
    });

    const { logradouro, bairro, localidade, uf, complemento, erro } =
      await response.json();

    if (erro) {
      return ErrorMessage("CEP não confere");
    }

    return { logradouro, bairro, localidade, uf, complemento };
  } catch (error) {
    return ErrorMessage("CEP não confere");
  }
}

export default getAddressByCep;
