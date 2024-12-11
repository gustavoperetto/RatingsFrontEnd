import React, { useEffect, useState } from 'react';
import './ModalProduct.css';
import axios from 'axios';

function ModalProduct({ show, onClose }) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [operation, setOperation] = useState('');

    useEffect(() => {
        if (show) {
            axios.get('http://localhost:8080/categories')
                .then(res => {
                    setCategories(res.data);
                })
                .catch(err => console.error('Error loading categories:', err));
        }
    }, [show]);

    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
    };

    const handleOperationChange = (event) => {
        setOperation(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (operation === 'add') {
            const newCategory = {
                name: categoryName,
                description: categoryDescription,
            };

            try {
                await axios.post('http://localhost:8080/categories', newCategory);
                alert('Categoria adicionada com sucesso');
                onClose();
                window.location.reload();
            } catch (e) {
                alert('Erro ao adicionar categoria: ' + e.message);
                console.error('Erro ao adicionar categoria:', e);
            }
        } else if (operation === 'delete') {
            try {
                await axios.delete(`http://localhost:8080/categories/${selectedCategory}`);
                alert('Categoria deletada com sucesso');
                onClose();
                window.location.reload();
            } catch (e) {
                alert('Erro ao deletar categoria: ' + e.message);
                console.error('Erro ao deletar categoria:', e);
            }
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Category Manager</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Operation
                        <select value={operation} onChange={handleOperationChange} required>
                            <option value="" disabled>Choose an operation</option>
                            <option value="add">Add a category</option>
                            <option value="delete">Delete a category</option>
                        </select>
                    </label>
                    <label>
                        Category:
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            required={operation === 'delete'}
                            disabled={operation !== 'delete'}
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Name of the category:
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required={operation === 'add'}
                            disabled={operation === 'delete'}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            required={operation === 'add'}
                            disabled={operation === 'delete'}
                        />
                    </label>

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" disabled={!operation}>
                            {operation === 'add' ? 'Add' : operation === 'delete' ? 'Delete' : 'Operation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalProduct;
