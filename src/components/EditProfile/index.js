import "./style.css";
import react from "react";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

function EditProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const history = useHistory();
  let emailWatch = watch("email");
  let nameWhatch = watch("nome");
  let passwordWatch = watch("senha");
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit(onSubmit)} className="form edit">
        <h3>// EDITAR usuário</h3>

        <div className="flex-column input">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Novo Usuário"
            {...register("nome", { required: true })}
          />
          {errors.name?.type === "required" &&
            toast.error("Campo nome é obrigatório")}
        </div>
        <div className="flex-column input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="exemplo@gmail.com"
            {...register("email", { required: true })}
          />
          {errors.name?.type === "required" &&
            toast.error("Campo email é obrigatório", {
              position: "top-right",
              autoClose: 3000,
            })}
        </div>
        <InputPassword {...register("senha", { required: true })} />
      </form>
    </div>
  );
}

export default EditProfile;
