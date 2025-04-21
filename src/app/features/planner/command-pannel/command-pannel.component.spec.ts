import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPannelComponent } from './command-pannel.component';

describe('CommandPannelComponent', () => {
  let component: CommandPannelComponent;
  let fixture: ComponentFixture<CommandPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
