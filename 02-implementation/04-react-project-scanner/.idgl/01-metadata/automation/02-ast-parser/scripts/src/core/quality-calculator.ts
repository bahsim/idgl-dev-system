import { CodePattern, QualityReport, ParseError } from './types';

/**
 * Quality Calculator - Calculates quality scores without parsing logic
 * Single Responsibility: Only calculates quality metrics, no pattern extraction or analysis
 */
export class QualityCalculator {
  
  /**
   * Calculate quality report for patterns
   */
  calculate(patterns: CodePattern[], errors: ParseError[] = []): QualityReport {
    const qualityMetrics = this.calculateQualityMetrics(patterns);
    const performanceMetrics = this.calculatePerformanceMetrics(patterns);
    const recommendations = this.generateRecommendations(qualityMetrics, patterns);
    
    return {
      quality: qualityMetrics,
      performance: performanceMetrics,
      recommendations,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calculate quality metrics for patterns
   */
  private calculateQualityMetrics(patterns: CodePattern[]): {
    patternDetectionRate: number;
    typeResolutionAccuracy: number;
    semanticAnalysisQuality: number;
    crossFileConsistency: number;
    overallQuality: number;
  } {
    if (patterns.length === 0) {
      return {
        patternDetectionRate: 0,
        typeResolutionAccuracy: 0,
        semanticAnalysisQuality: 0,
        crossFileConsistency: 0,
        overallQuality: 0
      };
    }

    // Calculate pattern detection rate
    const validPatterns = patterns.filter(p => p.name && p.type && p.filePath);
    const patternDetectionRate = (validPatterns.length / patterns.length) * 100;

    // Calculate type resolution accuracy
    const patternsWithTypes = patterns.filter(p => 
      p.metadata.returnType || 
      p.metadata.parameters?.length > 0 || 
      (p.metadata.genericTypes && p.metadata.genericTypes.length > 0)
    );
    const typeResolutionAccuracy = (patternsWithTypes.length / patterns.length) * 100;

    // Calculate semantic analysis quality
    const patternsWithSemantics = patterns.filter(p => 
      p.metadata.purpose && 
      p.metadata.architecturalMetrics && 
      p.metadata.complexity > 0
    );
    const semanticAnalysisQuality = (patternsWithSemantics.length / patterns.length) * 100;

    // Calculate cross-file consistency
    const crossFileConsistency = this.calculateCrossFileConsistency(patterns);

    // Calculate overall quality
    const overallQuality = (
      patternDetectionRate * 0.3 +
      typeResolutionAccuracy * 0.3 +
      semanticAnalysisQuality * 0.25 +
      crossFileConsistency * 0.15
    );

    return {
      patternDetectionRate,
      typeResolutionAccuracy,
      semanticAnalysisQuality,
      crossFileConsistency,
      overallQuality
    };
  }

  /**
   * Calculate performance metrics
   */
  private calculatePerformanceMetrics(patterns: CodePattern[]): {
    processingTime: number;
    memoryUsage: number;
    patternsPerSecond: number;
    efficiency: number;
  } {
    // For now, return default metrics - these will be populated by the pipeline
    return {
      processingTime: 0,
      memoryUsage: 0,
      patternsPerSecond: 0,
      efficiency: 0
    };
  }

  /**
   * Calculate cross-file consistency
   */
  private calculateCrossFileConsistency(patterns: CodePattern[]): number {
    const fileGroups = this.groupPatternsByFile(patterns);
    const consistencyScores = Object.values(fileGroups).map(group => 
      this.calculateFileConsistency(group)
    );
    
    if (consistencyScores.length === 0) return 100;
    
    return consistencyScores.reduce((a, b) => a + b, 0) / consistencyScores.length;
  }

  /**
   * Group patterns by file for consistency analysis
   */
  private groupPatternsByFile(patterns: CodePattern[]): Record<string, CodePattern[]> {
    const groups: Record<string, CodePattern[]> = {};
    
    patterns.forEach(pattern => {
      const file = pattern.filePath;
      if (!groups[file]) {
        groups[file] = [];
      }
      groups[file].push(pattern);
    });
    
    return groups;
  }

  /**
   * Calculate consistency within a single file
   */
  private calculateFileConsistency(patterns: CodePattern[]): number {
    if (patterns.length <= 1) return 100;
    
    // Check for consistent naming conventions
    const namingConsistency = this.checkNamingConsistency(patterns);
    
    // Check for consistent type usage
    const typeConsistency = this.checkTypeConsistency(patterns);
    
    // Check for consistent structure
    const structureConsistency = this.checkStructureConsistency(patterns);
    
    return (namingConsistency + typeConsistency + structureConsistency) / 3;
  }

  /**
   * Check naming consistency within a file
   */
  private checkNamingConsistency(patterns: CodePattern[]): number {
    const namingStyles = patterns.map(p => this.analyzeNamingStyle(p.name));
    const styleCounts = namingStyles.reduce((acc, style) => {
      acc[style] = (acc[style] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantStyle = Math.max(...Object.values(styleCounts));
    return (dominantStyle / patterns.length) * 100;
  }

  /**
   * Analyze naming style of a pattern
   */
  private analyzeNamingStyle(name: string): string {
    if (name.match(/^[A-Z][a-zA-Z]*$/)) return 'PascalCase';
    if (name.match(/^[a-z][a-zA-Z]*$/)) return 'camelCase';
    if (name.match(/^[a-z_][a-z0-9_]*$/)) return 'snake_case';
    if (name.match(/^[A-Z_][A-Z0-9_]*$/)) return 'UPPER_SNAKE_CASE';
    return 'mixed';
  }

  /**
   * Check type consistency within a file
   */
  private checkTypeConsistency(patterns: CodePattern[]): number {
    const patternsWithTypes = patterns.filter(p => p.metadata.returnType || p.metadata.parameters?.length > 0);
    if (patternsWithTypes.length === 0) return 100;
    
    const typeUsage = patternsWithTypes.map(p => ({
      returnType: p.metadata.returnType || 'any',
      hasParameters: p.metadata.parameters?.length > 0,
      hasGenerics: p.metadata.genericTypes && p.metadata.genericTypes.length > 0
    }));
    
    // Check if similar patterns have similar type structures
    let consistencyScore = 0;
    for (let i = 0; i < typeUsage.length; i++) {
      for (let j = i + 1; j < typeUsage.length; j++) {
        if (typeUsage[i]?.hasParameters === typeUsage[j]?.hasParameters &&
            typeUsage[i]?.hasGenerics === typeUsage[j]?.hasGenerics) {
          consistencyScore += 1;
        }
      }
    }
    
    const maxComparisons = (typeUsage.length * (typeUsage.length - 1)) / 2;
    return maxComparisons > 0 ? (consistencyScore / maxComparisons) * 100 : 100;
  }

  /**
   * Check structure consistency within a file
   */
  private checkStructureConsistency(patterns: CodePattern[]): number {
    const patternsWithStructure = patterns.filter(p => p.metadata.complexity > 0);
    if (patternsWithStructure.length === 0) return 100;
    
    const complexities = patternsWithStructure.map(p => p.metadata.complexity);
    const avgComplexity = complexities.reduce((a, b) => a + b, 0) / complexities.length;
    
    // Check if complexity is consistent (within reasonable range)
    const variance = complexities.reduce((acc, comp) => acc + Math.pow(comp - avgComplexity, 2), 0) / complexities.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Lower standard deviation means more consistent structure
    const consistencyScore = Math.max(0, 100 - (standardDeviation * 10));
    return consistencyScore;
  }

  /**
   * Generate quality improvement recommendations
   */
  private generateRecommendations(qualityMetrics: any, patterns: CodePattern[]): string[] {
    const recommendations: string[] = [];
    
    if (qualityMetrics.patternDetectionRate < 90) {
      recommendations.push('Improve pattern detection by enhancing type resolution and semantic analysis');
    }
    
    if (qualityMetrics.typeResolutionAccuracy < 85) {
      recommendations.push('Enhance TypeScript type extraction for better accuracy');
    }
    
    if (qualityMetrics.semanticAnalysisQuality < 80) {
      recommendations.push('Strengthen semantic analysis for better pattern classification');
    }
    
    if (qualityMetrics.crossFileConsistency < 75) {
      recommendations.push('Improve cross-file consistency by standardizing analysis approach');
    }
    
    // Pattern-specific recommendations
    const uiPatterns = patterns.filter(p => p.metadata.purpose === 'UI');
    const logicPatterns = patterns.filter(p => p.metadata.purpose === 'Logic');
    
    if (uiPatterns.length > 0 && logicPatterns.length > 0) {
      const avgUIComplexity = uiPatterns.reduce((acc, p) => acc + p.metadata.complexity, 0) / uiPatterns.length;
      const avgLogicComplexity = logicPatterns.reduce((acc, p) => acc + p.metadata.complexity, 0) / logicPatterns.length;
      
      if (avgUIComplexity > avgLogicComplexity) {
        recommendations.push('Consider simplifying UI components by extracting complex logic into custom hooks');
      }
    }
    
    return recommendations;
  }

  /**
   * Filter patterns by quality thresholds
   */
  filterPatternsByQuality(patterns: CodePattern[], options: {
    minOverallQuality?: number;
    minPatternDetectionRate?: number;
    minTypeResolutionAccuracy?: number;
    minSemanticAnalysisQuality?: number;
    minCrossFileConsistency?: number;
  } = {}): CodePattern[] {
    if (!options.minOverallQuality && 
        !options.minPatternDetectionRate && 
        !options.minTypeResolutionAccuracy && 
        !options.minSemanticAnalysisQuality && 
        !options.minCrossFileConsistency) {
      return patterns; // No filtering if no quality filters specified
    }

    const qualityReport = this.calculateQualityMetrics(patterns);
    
    return patterns.filter(pattern => {
      // Check if pattern meets quality thresholds
      const patternQuality = this.calculateIndividualPatternQuality(pattern);
      
      // Apply quality filters
      if (options.minOverallQuality && patternQuality.overallQuality < options.minOverallQuality) {
        return false;
      }
      
      if (options.minPatternDetectionRate && qualityReport.patternDetectionRate < options.minPatternDetectionRate) {
        return false;
      }
      
      if (options.minTypeResolutionAccuracy && patternQuality.typeResolutionAccuracy < options.minTypeResolutionAccuracy) {
        return false;
      }
      
      if (options.minSemanticAnalysisQuality && patternQuality.semanticAnalysisQuality < options.minSemanticAnalysisQuality) {
        return false;
      }
      
      if (options.minCrossFileConsistency && qualityReport.crossFileConsistency < options.minCrossFileConsistency) {
        return false;
      }
      
      return true;
    });
  }

  /**
   * Calculate quality metrics for an individual pattern
   */
  private calculateIndividualPatternQuality(pattern: CodePattern): {
    typeResolutionAccuracy: number;
    semanticAnalysisQuality: number;
    overallQuality: number;
  } {
    const quality = {
      typeResolutionAccuracy: 0,
      semanticAnalysisQuality: 0,
      overallQuality: 0
    };
    
    // Calculate type resolution accuracy
    if (pattern.metadata.returnType && pattern.metadata.returnType !== 'any') {
      quality.typeResolutionAccuracy += 50;
    }
    if (pattern.metadata.parameters && pattern.metadata.parameters.length > 0) {
      quality.typeResolutionAccuracy += 30;
    }
    if (pattern.metadata.genericTypes && pattern.metadata.genericTypes.length > 0) {
      quality.typeResolutionAccuracy += 20;
    }
    
    // Calculate semantic analysis quality
    if (pattern.metadata.purpose) {
      quality.semanticAnalysisQuality += 40;
    }
    if (pattern.metadata.architecturalMetrics) {
      quality.semanticAnalysisQuality += 30;
    }
    if (pattern.metadata.complexity > 0) {
      quality.semanticAnalysisQuality += 30;
    }
    
    // Calculate overall quality
    quality.overallQuality = (quality.typeResolutionAccuracy + quality.semanticAnalysisQuality) / 2;
    
    return quality;
  }

  /**
   * Get quality summary for patterns
   */
  getQualitySummary(patterns: CodePattern[]): {
    overall: any;
    distribution: {
      high: number;
      medium: number;
      low: number;
    };
    recommendations: string[];
  } {
    const qualityReport = this.calculateQualityMetrics(patterns);
    const individualQualities = patterns.map(p => this.calculateIndividualPatternQuality(p));
    
    const summary = {
      overall: qualityReport,
      distribution: {
        high: individualQualities.filter(q => q.overallQuality >= 80).length,
        medium: individualQualities.filter(q => q.overallQuality >= 60 && q.overallQuality < 80).length,
        low: individualQualities.filter(q => q.overallQuality < 60).length
      },
      recommendations: this.generateRecommendations(qualityReport, patterns)
    };
    
    return summary;
  }
}
