

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { heroCreated } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const heroSchema = z.object({
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа').trim(),
    description: z.string().min(2, 'Имя должно содержать минимум 2 символа').trim(),
    element: z.string().min(1, 'Выберите элемент')
})

const HeroesAddForm = () => {

    const dispatch = useDispatch()
    const { request } = useHttp()

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: {errors, isSubmitting}
    } = useForm({
        resolver: zodResolver(heroSchema), 
        mode: "onBlur"
    })

    const onSubmit = async (data) => {
        
        try {
            const newHero = await request(
            'http://localhost:3001/heroes', 
            'POST', 
            JSON.stringify(data)
        )

        dispatch(heroCreated(newHero))
        reset()
        } catch (error) {
            console.error("Ошибка при создании", error)
            alert("Не удалось сохранить героя. Проверьте соединение с сервером.");
        }
    } 

    return (
        <form 
        className="border p-4 shadow-lg rounded"
        onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    {...register('name')}
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ""}` }
                    id="name" 
                    placeholder="Как меня зовут?"/>
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ""}` }
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    {...register('element')}
                    className={`form-select ${errors.element ? 'is-invalid' : ""}` }
                    id="element">
                    <option value="">Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
                {errors.element && <div className="invalid-feedback">{errors.element.message}</div>}
            </div>

            <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}>
                Создать
            </button>
        </form>
    )
}

export default HeroesAddForm;