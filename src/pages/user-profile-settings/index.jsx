import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbContextHelper from '../../components/ui/BreadcrumbContextHelper';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import AccountInformationSection from './components/AccountInformationSection';
import ClassificationPreferencesSection from './components/ClassificationPreferencesSection';
import ExportSettingsSection from './components/ExportSettingsSection';
import UsageStatisticsSection from './components/UsageStatisticsSection';
import LanguageLocalizationSection from './components/LanguageLocalizationSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [userProfile, setUserProfile] = useState({
    name: "María González",
    email: "maria.gonzalez@email.com",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb9fc75-1762273370028.png",
    avatarAlt: "Professional headshot of Hispanic woman with shoulder-length dark hair wearing white blouse",
    memberSince: "2023-03-15T10:30:00Z",
    lastLogin: "2024-11-07T09:15:00Z"
  });

  const [classificationPreferences, setClassificationPreferences] = useState({
    defaultCategory: "animals",
    confidenceThreshold: 0.7,
    autoProcess: false,
    showConfidenceScores: true,
    enableBatchProcessing: false,
    maxBatchSize: 10,
    resultDisplayFormat: "detailed",
    saveToHistory: true
  });

  const [exportSettings, setExportSettings] = useState({
    defaultFormat: "json",
    filenamePattern: "clasificacion_{date}_{time}",
    includeImages: false,
    includeMetadata: true,
    autoExportThreshold: 0,
    compressionLevel: "medium",
    dateFormat: "dd/mm/yyyy"
  });

  const [localizationSettings, setLocalizationSettings] = useState({
    language: "es",
    region: "ES",
    dateFormat: "dd/mm/yyyy",
    timeFormat: "24h",
    numberFormat: "european",
    currency: "EUR",
    timezone: "Europe/Madrid",
    autoDetectLocation: false,
    rtlSupport: false
  });

  const [usageStatistics] = useState({
    totalClassifications: 1247,
    classificationsThisMonth: 89,
    totalImages: 1156,
    averagePerDay: 12,
    averageAccuracy: 0.892,
    accuracyTrend: 2.3,
    totalProcessingTime: 2847,
    averageProcessingTime: 2.4,
    storageUsed: 524288000,
    storageLimit: 1073741824,
    categoryBreakdown: [
    { name: "Animales", count: 456, color: "#1E40AF" },
    { name: "Ropa", count: 312, color: "#6366F1" },
    { name: "Comida", count: 289, color: "#10B981" },
    { name: "Vehículos", count: 134, color: "#D97706" },
    { name: "Objetos", count: 56, color: "#DC2626" }],

    recentActivity: [
    {
      action: "Clasificación completada",
      details: "Imagen de gato clasificada correctamente",
      timestamp: "2024-11-07T13:45:00Z",
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success bg-opacity-10"
    },
    {
      action: "Configuración actualizada",
      details: "Umbral de confianza modificado a 80%",
      timestamp: "2024-11-07T11:20:00Z",
      icon: "Settings",
      color: "text-primary",
      bgColor: "bg-primary bg-opacity-10"
    },
    {
      action: "Exportación realizada",
      details: "Historial exportado en formato CSV",
      timestamp: "2024-11-06T16:30:00Z",
      icon: "Download",
      color: "text-secondary",
      bgColor: "bg-secondary bg-opacity-10"
    },
    {
      action: "Nueva categoría creada",
      details: "Categoría 'Plantas' añadida al sistema",
      timestamp: "2024-11-06T14:15:00Z",
      icon: "Plus",
      color: "text-accent",
      bgColor: "bg-accent bg-opacity-10"
    }],

    accountCreated: "2023-03-15T10:30:00Z",
    lastLogin: "2024-11-07T09:15:00Z",
    activeDays: 247
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('app-language') || 'es';
    setLocalizationSettings((prev) => ({ ...prev, language: savedLanguage }));
  }, []);

  const tabs = [
  {
    id: 'account',
    label: 'Cuenta',
    icon: 'User',
    description: 'Información personal y seguridad'
  },
  {
    id: 'preferences',
    label: 'Clasificación',
    icon: 'Settings',
    description: 'Preferencias de procesamiento'
  },
  {
    id: 'export',
    label: 'Exportación',
    icon: 'Download',
    description: 'Configuración de exportación'
  },
  {
    id: 'localization',
    label: 'Idioma',
    icon: 'Globe',
    description: 'Idioma y formato regional'
  },
  {
    id: 'statistics',
    label: 'Estadísticas',
    icon: 'BarChart3',
    description: 'Uso y actividad'
  }];


  const handleUpdateProfile = (updatedData) => {
    setUserProfile((prev) => ({ ...prev, ...updatedData }));
    showNotification('Perfil actualizado correctamente', 'success');
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setClassificationPreferences(updatedPreferences);
    showNotification('Preferencias guardadas correctamente', 'success');
  };

  const handleUpdateExportSettings = (updatedSettings) => {
    setExportSettings(updatedSettings);
    showNotification('Configuración de exportación guardada', 'success');
  };

  const handleUpdateLocalization = (updatedSettings) => {
    setLocalizationSettings(updatedSettings);
    showNotification('Configuración de idioma aplicada', 'success');
  };

  const handleExportData = (exportType, settings) => {
    console.log(`Exporting ${exportType} with settings:`, settings);
    showNotification(`Exportación de ${exportType} iniciada`, 'info');
  };

  const showNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()?.toISOString()
    };

    setNotifications((prev) => [notification, ...prev?.slice(0, 4)]);

    setTimeout(() => {
      setNotifications((prev) => prev?.filter((n) => n?.id !== notification?.id));
    }, 5000);
  };

  const breadcrumbs = [
  { label: 'Inicio', path: '/image-upload-dashboard', icon: 'Home' },
  { label: 'Configuración de Perfil', icon: 'User' }];


  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Configuración de Perfil - ImageClassifier</title>
        <meta name="description" content="Gestiona tu cuenta, preferencias de clasificación y configuración de la aplicación ImageClassifier" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbContextHelper
            customBreadcrumbs={breadcrumbs} />


          {/* Notifications */}
          {notifications?.length > 0 &&
          <div className="fixed top-20 right-4 z-150 space-y-2">
              {notifications?.map((notification) =>
            <div
              key={notification?.id}
              className={`
                    max-w-sm p-4 rounded-lg shadow-lg border animate-in slide-in-from-right-2 duration-300
                    ${notification?.type === 'success' ? 'bg-success bg-opacity-10 border-success text-success' :
              notification?.type === 'error' ? 'bg-error bg-opacity-10 border-error text-error' : 'bg-primary bg-opacity-10 border-primary text-primary'}
                  `
              }>

                  <div className="flex items-center">
                    <Icon
                  name={notification?.type === 'success' ? 'CheckCircle' :
                  notification?.type === 'error' ? 'AlertCircle' : 'Info'}
                  size={16}
                  className="mr-2" />

                    <span className="text-sm font-medium">{notification?.message}</span>
                  </div>
                </div>
            )}
            </div>
          }

          {/* Profile Header */}
          <div className="bg-surface border border-border rounded-lg p-6 mb-8 elevation-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden elevation-2">
                <img
                  src={userProfile?.avatar}
                  alt={userProfile?.avatarAlt}
                  className="w-full h-full object-cover" />

              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  {userProfile?.name}
                </h1>
                <p className="text-text-secondary mb-1">{userProfile?.email}</p>
                <div className="flex items-center text-sm text-text-secondary">
                  <Icon name="Calendar" size={14} className="mr-1" />
                  <span>Miembro desde {new Date(userProfile.memberSince)?.toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm text-success">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span>Activo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-surface border border-border rounded-lg mb-8 elevation-1">
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                      flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-150 ease-out btn-scale
                      ${activeTab === tab?.id ?
                  'text-primary border-b-2 border-primary bg-primary bg-opacity-5' : 'text-text-secondary hover:text-text-primary hover:bg-muted'}
                    `
                  }>

                    <Icon name={tab?.icon} size={16} className="mr-2" />
                    <div className="text-left">
                      <div>{tab?.label}</div>
                      <div className="text-xs opacity-75 hidden sm:block">
                        {tab?.description}
                      </div>
                    </div>
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'account' &&
            <AccountInformationSection
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile} />

            }

            {activeTab === 'preferences' &&
            <ClassificationPreferencesSection
              preferences={classificationPreferences}
              onUpdatePreferences={handleUpdatePreferences} />

            }

            {activeTab === 'export' &&
            <ExportSettingsSection
              exportSettings={exportSettings}
              onUpdateSettings={handleUpdateExportSettings}
              onExportData={handleExportData} />

            }

            {activeTab === 'localization' &&
            <LanguageLocalizationSection
              localizationSettings={localizationSettings}
              onUpdateSettings={handleUpdateLocalization} />

            }

            {activeTab === 'statistics' &&
            <UsageStatisticsSection
              statistics={usageStatistics} />

            }
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-surface border border-border rounded-lg p-6 elevation-1">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Acciones Rápidas
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Upload"
                iconPosition="left"
                fullWidth
                onClick={() => window.location.href = '/image-upload-dashboard'}>

                Nueva Clasificación
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Clock"
                iconPosition="left"
                fullWidth
                onClick={() => window.location.href = '/classification-history'}>

                Ver Historial
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                fullWidth
                onClick={() => handleExportData('completo', exportSettings)}>

                Exportar Todo
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="HelpCircle"
                iconPosition="left"
                fullWidth
                onClick={() => console.log('Open help')}>

                Ayuda
              </Button>
            </div>
          </div>
        </div>
      </main>
      <QuickActionFloatingButton />
    </div>);

};

export default UserProfileSettings;