import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AccountInformationSection = ({ userProfile, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (showPasswordFields) {
      if (!formData?.currentPassword) {
        newErrors.currentPassword = 'Contraseña actual requerida';
      }
      
      if (formData?.newPassword && formData?.newPassword?.length < 8) {
        newErrors.newPassword = 'La nueva contraseña debe tener al menos 8 caracteres';
      }
      
      if (formData?.newPassword !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedData = {
        name: formData?.name,
        email: formData?.email
      };
      
      if (showPasswordFields && formData?.newPassword) {
        updatedData.passwordChanged = true;
      }
      
      onUpdateProfile(updatedData);
      
      // Reset password fields
      if (showPasswordFields) {
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setShowPasswordFields(false);
      }
    } catch (error) {
      setErrors({ general: 'Error al guardar los cambios' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center mb-6">
        <Icon name="User" size={24} className="text-primary mr-3" />
        <h3 className="text-lg font-semibold text-text-primary">
          Información de la Cuenta
        </h3>
      </div>
      {errors?.general && (
        <div className="mb-4 p-3 bg-error bg-opacity-10 border border-error rounded-lg">
          <div className="flex items-center">
            <Icon name="AlertCircle" size={16} className="text-error mr-2" />
            <span className="text-sm text-error">{errors?.general}</span>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre Completo"
            type="text"
            placeholder="Ingresa tu nombre"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="tu@email.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-md font-medium text-text-primary">
                Cambiar Contraseña
              </h4>
              <p className="text-sm text-text-secondary">
                Actualiza tu contraseña para mayor seguridad
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              iconName={showPasswordFields ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {showPasswordFields ? 'Ocultar' : 'Cambiar'}
            </Button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              <Input
                label="Contraseña Actual"
                type="password"
                placeholder="Ingresa tu contraseña actual"
                value={formData?.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e?.target?.value)}
                error={errors?.currentPassword}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nueva Contraseña"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData?.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e?.target?.value)}
                  error={errors?.newPassword}
                  description="Debe contener al menos 8 caracteres"
                />

                <Input
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="Repite la nueva contraseña"
                  value={formData?.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                  error={errors?.confirmPassword}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            variant="default"
            onClick={handleSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            disabled={!formData?.name || !formData?.email}
          >
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformationSection;
