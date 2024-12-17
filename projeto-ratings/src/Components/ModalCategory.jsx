import React, { useEffect, useState } from 'react';
import './ModalCategory.css';
import axios from 'axios';

function ModalProduct({ show, onClose, onNotify }) {
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
        } else {
            setCategoryName('');
            setCategoryDescription('');
            setSelectedCategory('');
            setOperation('');
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
                onNotify('Category added successfully!', 'success');
                onClose();
            } catch (error) {
                onNotify('Error adding category.', 'error');
                console.error('Error:', error);
                onClose();
            }
        } else if (operation === 'delete') {
            try {
                await axios.delete(`http://localhost:8080/categories/${selectedCategory}`);
                onNotify('Category deleted successfully!', 'success');
                const productsUpdatedEvent = new CustomEvent('productsUpdated', {
                    detail: { updatedProducts: [] }
                });
                window.dispatchEvent(productsUpdatedEvent);
                onClose();
            } catch (error) {
                onNotify('Error deleting category.', 'error');
                console.error('Error:', error);
                onClose();
            }
        }
    };


    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay-category">
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
