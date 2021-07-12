import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Roles } from 'src/app/models/Role';
import { RolesService } from 'src/app/service/roles/roles.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss'],
})
export class EditRolesComponent implements OnInit {
  @Input() editRoletitle?: string;
  submitted = false;
  public loading: boolean = true;
  public roles: Roles[] = [];

  constructor(
    public roleService: RolesService,
    private toast: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getAllRole().then(null);
  }

  public async getAllRole(): Promise<void> {
    this.roleService.getAllRoles().subscribe(
      (data: any) => {
        this.roles = data;
        this.loading = false;
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'सफल भएन');
      }
    );
  }
  dismiss(){}
  updateRoleData(id, editRoleForm: NgForm) {
    this.roleService.updateRole(id, editRoleForm.value).subscribe(
      () => {
        this.getAllRole().then(() => {
          this.toast.success(
            $localize`:@@fiscalYearDataCreated:भूमिका सफलतापूर्वक अपडेट गरियो.`,
            $localize`:@@success: सफल भयो`
          );
        });
      },
      (error) => {
        this.toast.danger(error.error.responseObject.message, 'सफल भएन');
      }
    );
  }
}
