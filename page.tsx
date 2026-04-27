'use client'

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, FileText, Layers, Box, Square, BarChart, Zap, Droplets, ClipboardCheck, FileSignature, Printer, Settings, Info, Save, FolderOpen, Plus, Download, Badge, Trash2, Edit2, Check, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/translations';
import { useProjectStore } from '@/store/projectStore';
import { useSettingsStore } from '@/store/settingsStore';
import { toast } from 'sonner';
import BuildingInfo from '@/components/interfaces/BuildingInfo';
import ArchitecturalReport from '@/components/interfaces/ArchitecturalReport';
import StructuralReport from '@/components/interfaces/StructuralReport';
import Foundations from '@/components/interfaces/Foundations';
import Columns from '@/components/interfaces/Columns';
import SlabsAndBeams from '@/components/interfaces/SlabsAndBeams';
import Electrical from '@/components/interfaces/Electrical';
import Plumbing from '@/components/interfaces/Plumbing';
import TechnicalNotes from '@/components/interfaces/TechnicalNotes';
import FinalReport from '@/components/interfaces/FinalReport';
import GenerateReports from '@/components/interfaces/GenerateReports';
import SettingsPanel from '@/components/interfaces/SettingsPanel';
import AboutPanel from '@/components/interfaces/AboutPanel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Home() {
  const { language, _hasHydrated: settingsHydrated } = useSettingsStore();
  const { _hasHydrated: projectHydrated } = useProjectStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('building');
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editProjectName, setEditProjectName] = useState('');
  const { savedProjects, currentProjectId, setCurrentProject, createNewProject, loadProject, deleteProject, editProjectName: updateProjectName } = useProjectStore();
  const hasHydrated = settingsHydrated && projectHydrated;
  
  useEffect(() => {
    if (!hasHydrated) return;
    
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, hasHydrated]);

  const handleCreateNewProject = () => {
    createNewProject();
    setActiveTab('building');
    toast.success('تم إنشاء مشروع جديد بنجاح', {
      icon: <Plus className="h-4 w-4" />
    });
  };

  const handleLoadProject = (projectId: string) => {
    const project = savedProjects.find(p => p.id === projectId);
    loadProject(projectId);
    setShowProjectDialog(false);
    setActiveTab('building');
    if (project) {
      toast.success(`تم استدعاء المشروع "${project.name}" بنجاح`, {
        icon: <Download className="h-4 w-4" />
      });
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const project = savedProjects.find(p => p.id === projectId);
    deleteProject(projectId);
    if (project) {
      toast.success(`تم حذف المشروع "${project.name}" بنجاح`, {
        icon: <Trash2 className="h-4 w-4" />
      });
    }
  };

  const handleStartEditProjectName = (projectId: string, currentName: string) => {
    setEditingProjectId(projectId);
    setEditProjectName(currentName);
  };

  const handleCancelEditProjectName = () => {
    setEditingProjectId(null);
    setEditProjectName('');
  };

  const handleSaveProjectName = async (projectId: string) => {
    if (editProjectName.trim()) {
      await updateProjectName(projectId, editProjectName.trim());
      toast.success('تم تحديث اسم المشروع بنجاح', {
        icon: <Check className="h-4 w-4" />
      });
      setEditingProjectId(null);
      setEditProjectName('');
    }
  };

  const currentProject = savedProjects.find(p => p.id === currentProjectId);

  const tabConfig = [
    { key: 'building', icon: Building2, label: t.tabs?.building || 'بيانات المنشأة' },
    { key: 'architectural', icon: FileText, label: t.tabs?.architectural || 'التقرير المعماري' },
    { key: 'structural', icon: Layers, label: t.tabs?.structural || 'التقرير الإنشائي' },
    { key: 'foundations', icon: Box, label: t.tabs?.foundations || 'الأساسات' },
    { key: 'columns', icon: Square, label: t.tabs?.columns || 'الأعمدة' },
    { key: 'beams', icon: BarChart, label: t.tabs?.beams || 'البلاطات والجوائز' },
    { key: 'electrical', icon: Zap, label: t.tabs?.electrical || 'الكهرباء' },
    { key: 'plumbing', icon: Droplets, label: t.tabs?.plumbing || 'التمديدات الصحية' },
    { key: 'notes', icon: ClipboardCheck, label: t.tabs?.notes || 'الملاحظات الفنية' },
    { key: 'final', icon: FileSignature, label: t.tabs?.final || 'التقرير النهائي' },
    { key: 'reports', icon: Printer, label: t.tabs?.reports || 'توليد التقارير' },
    { key: 'settings', icon: Settings, label: t.tabs?.settings || 'الإعدادات' },
    { key: 'about', icon: Info, label: t.tabs?.about || 'حول التطبيق' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo Image - without frame or shadow */}
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {t.appName}
                </h1>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
                  {t.appSubtitle}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {currentProject && (
                <span className="text-sm text-slate-600 dark:text-slate-400 hidden md:block font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  {currentProject.name}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProjectDialog(true)}
                className="gap-2"
              >
                <FolderOpen className="h-4 w-4" />
                <span className="hidden sm:inline">{t.buildingInfo.savedProjects}</span>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleCreateNewProject}
                className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{t.buildingInfo.newProject}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Professional Tab Navigation - Grid Layout */}
          <div className="bg-gradient-to-br from-emerald-50/95 to-teal-50/95 dark:from-emerald-950/95 dark:to-teal-950/95 rounded-xl shadow-lg p-4 border border-emerald-200 dark:border-emerald-800">
            <TabsList className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-3 bg-transparent h-auto p-0">
              {tabConfig.map((tab) => (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className="flex flex-col items-center justify-center gap-2 h-auto py-4 px-3 bg-emerald-100/60 dark:bg-emerald-900/40 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/70 border-2 border-transparent data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:border-emerald-400 data-[state=active]:shadow-lg rounded-lg transition-all duration-200"
                >
                  <tab.icon className="h-6 w-6 md:h-7 md:w-7 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-center leading-tight">
                    {tab.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Contents */}
          <TabsContent value="building" className="space-y-4">
            <BuildingInfo />
          </TabsContent>

          <TabsContent value="architectural" className="space-y-4">
            <ArchitecturalReport />
          </TabsContent>

          <TabsContent value="structural" className="space-y-4">
            <StructuralReport />
          </TabsContent>

          <TabsContent value="foundations" className="space-y-4">
            <Foundations />
          </TabsContent>

          <TabsContent value="columns" className="space-y-4">
            <Columns />
          </TabsContent>

          <TabsContent value="beams" className="space-y-4">
            <SlabsAndBeams />
          </TabsContent>

          <TabsContent value="electrical" className="space-y-4">
            <Electrical />
          </TabsContent>

          <TabsContent value="plumbing" className="space-y-4">
            <Plumbing />
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <TechnicalNotes />
          </TabsContent>

          <TabsContent value="final" className="space-y-4">
            <FinalReport />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <GenerateReports />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsPanel />
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <AboutPanel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/90 dark:bg-slate-950/90 backdrop-blur-md mt-auto shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            {t.appRights}
          </p>
        </div>
      </footer>

      {/* Projects Dialog */}
      <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <FolderOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              {t.buildingInfo.manageProjects}
            </DialogTitle>
            <DialogDescription>
              اختر مشروعاً للعمل عليه أو أنشئ مشروعاً جديداً
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-6">
            {savedProjects.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <FolderOpen className="h-16 w-16 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                  {t.buildingInfo.noProjects}
                </p>
                <Button
                  onClick={() => {
                    handleCreateNewProject();
                    setShowProjectDialog(false);
                  }}
                  className="mt-4 gap-2 bg-gradient-to-r from-emerald-500 to-teal-600"
                >
                  <Plus className="h-4 w-4" />
                  إنشاء مشروع جديد
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg hover:border-emerald-400 ${
                      project.current 
                        ? 'border-2 border-emerald-500 shadow-md bg-emerald-50 dark:bg-emerald-950/30' 
                        : 'border-2 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <CardContent className="p-4">
                      {/* Header with icon */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2.5 rounded-lg">
                          <Building2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        {project.current && (
                          <Badge className="bg-emerald-600 text-white text-xs px-2 py-1">
                            الحالي
                          </Badge>
                        )}
                      </div>
                      
                      {/* Project Name - Editable */}
                      {editingProjectId === project.id ? (
                        <div className="flex gap-1 mb-3">
                          <Input
                            value={editProjectName}
                            onChange={(e) => setEditProjectName(e.target.value)}
                            className="flex-1 h-10 text-sm"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveProjectName(project.id!);
                              } else if (e.key === 'Escape') {
                                handleCancelEditProjectName();
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveProjectName(project.id!)}
                            className="h-10 px-2 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEditProjectName}
                            className="h-10 px-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                            {project.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStartEditProjectName(project.id!, project.name)}
                            className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Edit2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          </Button>
                        </div>
                      )}
                      
                      {/* Owner Name */}
                      {project.buildingInfo?.ownerName && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1">
                          <span className="text-xs">المالك:</span>
                          <span className="font-medium">{project.buildingInfo.ownerName}</span>
                        </p>
                      )}
                      
                      {/* Date */}
                      <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
                        <span suppressHydrationWarning>
                          {new Date(parseInt(project.id?.split('-')[1] || '0')).toLocaleDateString(
                            language === 'ar' ? 'ar-SY' : 'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </span>
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.id !== currentProjectId && (
                          <Button
                            onClick={() => handleLoadProject(project.id!)}
                            className="flex-1 gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                          >
                            <Download className="h-4 w-4" />
                            <span className="font-medium">استدعاء</span>
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (confirm(t.buildingInfo.confirmDelete)) {
                              handleDeleteProject(project.id!);
                            }
                          }}
                          className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:border-red-900 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Create New Project Button */}
            {savedProjects.length > 0 && (
              <div className="pt-4 border-t">
                <Button
                  onClick={() => {
                    handleCreateNewProject();
                    setShowProjectDialog(false);
                  }}
                  className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md py-6 text-base"
                >
                  <Plus className="h-5 w-5" />
                  إنشاء مشروع جديد
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
