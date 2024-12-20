import React, { useEffect, useState } from 'react';
import './ModalCategory.css';
import axios from 'axios';
import Confirmation from './Confirmation';

function ModalProduct({ show, onClose, onNotify }) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [operation, setOperation] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    const resetFields = () => {
        setCategoryName('');
        setCategoryDescription('');
        setSelectedCategory('');
        setOperation('');
        setShowConfirmation(false);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleOperationChange = (event) => {
        setOperation(event.target.value);
    };

    const handleConfirm = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            onNotify('No permission to do this operation, contact your administrator!', 'error');
            return;
        }

        if (operation === 'add') {
            const newCategory = {
                name: categoryName,
                description: categoryDescription,
            };

            try {
                await axios.post('http://localhost:8080/categories', newCategory, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                onNotify('Category added successfully!', 'success');
            } catch (error) {
                onNotify('Error adding category.', 'error');
                console.error('Error:', error);
            }
        } else if (operation === 'delete') {
            try {
                await axios.delete(`http://localhost:8080/categories/${selectedCategory}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                onNotify('Category deleted successfully!', 'success');
            } catch (error) {
                onNotify('Error deleting category.', 'error');
                console.error('Error:', error);
            }
        }
        resetFields();
        onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowConfirmation(true);
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
            {showConfirmation && (
                <Confirmation
                    message={
                        operation === 'add'
                            ? `Do you want to add the category "${categoryName}"?`
                            : `Do you want to delete the selected category?`
                    }
                    onConfirm={handleConfirm}
                    onClose={() => setShowConfirmation(false)}
                />
            )}
        </div>
    );
}

export default ModalProduct;
