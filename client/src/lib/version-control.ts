export interface Version {
  id: string;
  content: string;
  timestamp: number;
}

export class VersionControl {
  private versions: Version[] = [];
  private currentIndex: number = -1;

  addVersion(content: string): void {
    this.versions = this.versions.slice(0, this.currentIndex + 1);
    this.versions.push({
      id: crypto.randomUUID(),
      content,
      timestamp: Date.now(),
    });
    this.currentIndex = this.versions.length - 1;
  }

  undo(): string | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.versions[this.currentIndex].content;
    }
    return null;
  }

  redo(): string | null {
    if (this.currentIndex < this.versions.length - 1) {
      this.currentIndex++;
      return this.versions[this.currentIndex].content;
    }
    return null;
  }

  getCurrentVersion(): Version | null {
    return this.versions[this.currentIndex] || null;
  }

  getHistory(): Version[] {
    return [...this.versions];
  }
}
