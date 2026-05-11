import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected selectedSection: AdminSection = 'dashboard';

  protected readonly menuItems: Array<{
    key: AdminSection;
    label: string;
    icon: string;
  }> = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'agenda', label: 'Agenda mensual', icon: 'calendar_month' },
    { key: 'registro', label: 'Registro de usuarios', icon: 'person_add' },
    { key: 'mensajes', label: 'Mensajes', icon: 'mail' },
    { key: 'usuarios', label: 'Gestion de usuarios', icon: 'group' },
  ];

  protected readonly sectionContent: Record<
    AdminSection,
    {
      title: string;
      description: string;
      actions: string[];
      tasks: string[];
    }
  > = {
    dashboard: {
      title: 'Resumen general',
      description:
        'Vista rapida del estado operativo para tomar decisiones del dia.',
      actions: ['Ver actividad reciente', 'Revisar alertas'],
      tasks: ['2 incidencias pendientes', '1 reporte listo para exportar'],
    },
    agenda: {
      title: 'Agenda mensual',
      description: 'Organiza eventos, recordatorios y seguimiento del equipo.',
      actions: ['Crear evento', 'Programar recordatorio'],
      tasks: ['Reunion de seguimiento - martes', 'Capacitacion interna - jueves'],
    },
    registro: {
      title: 'Registro de usuarios',
      description:
        'Controla altas de cuentas y valida datos de nuevos usuarios.',
      actions: ['Nuevo registro manual', 'Validar documentos'],
      tasks: ['5 registros en revision', '2 solicitudes incompletas'],
    },
    mensajes: {
      title: 'Mensajes',
      description: 'Gestiona bandeja de entrada y comunicaciones internas.',
      actions: ['Redactar mensaje', 'Marcar todos como leidos'],
      tasks: ['3 mensajes sin responder', '1 aviso por publicar'],
    },
    usuarios: {
      title: 'Gestion de usuarios',
      description: 'Administra roles, permisos y estado de cuentas.',
      actions: ['Asignar rol', 'Suspender acceso'],
      tasks: ['4 cambios de rol pendientes', 'Auditoria semanal programada'],
    },
  };

  protected selectSection(section: AdminSection): void {
    this.selectedSection = section;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

type AdminSection = 'dashboard' | 'agenda' | 'registro' | 'mensajes' | 'usuarios';
