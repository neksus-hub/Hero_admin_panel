
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { filterChanged } from "../../actions";
import { useMemo } from "react";

const HeroesFilters = () => {
    const { heroes, activeFilter } = useSelector(state => state);
    const dispatch = useDispatch();

    const availableFilters = useMemo(() => {
        const uniqueElements = [...new Set(heroes.map(hero => hero.element))];
        return ['all', ...uniqueElements];
    }, [heroes]);

    const filterConfig = {
        all: { label: 'Все', className: 'btn-outline-dark' },
        fire: { label: 'Огонь', className: 'btn-danger' },
        water: { label: 'Вода', className: 'btn-primary' },
        wind: { label: 'Ветер', className: 'btn-success' },
        earth: { label: 'Земля', className: 'btn-secondary' }
    };

    const renderFilters = availableFilters.map(filter => {
        const { label, className } = filterConfig[filter] || { label: filter, className: 'btn-outline-dark' };
        const isActive = activeFilter === filter;

        return (
            <button 
                key={filter}
                className={`btn ${className} ${isActive ? 'active' : ''}`}
                onClick={() => dispatch(filterChanged(filter))}
            >
                {label}
            </button>
        );
    });

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;